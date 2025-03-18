// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DEX is ReentrancyGuard, Ownable {
    // Token addresses
    address public token1;
    address public token2;

    // Liquidity pool reserves
    uint256 public reserve1;
    uint256 public reserve2;

    // Events
    event Swap(address indexed user, address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOut);
    event AddLiquidity(address indexed user, uint256 amount1, uint256 amount2);
    event RemoveLiquidity(address indexed user, uint256 amount1, uint256 amount2);

    constructor(address _token1, address _token2) {
        token1 = _token1;
        token2 = _token2;
    }

    // Add liquidity to the pool
    function addLiquidity(uint256 amount1, uint256 amount2) external nonReentrant {
        require(amount1 > 0 && amount2 > 0, "Amounts must be greater than 0");

        // Transfer tokens from user to contract
        IERC20(token1).transferFrom(msg.sender, address(this), amount1);
        IERC20(token2).transferFrom(msg.sender, address(this), amount2);

        // Update reserves
        reserve1 += amount1;
        reserve2 += amount2;

        emit AddLiquidity(msg.sender, amount1, amount2);
    }

    // Remove liquidity from the pool
    function removeLiquidity(uint256 amount1, uint256 amount2) external nonReentrant {
        require(amount1 <= reserve1 && amount2 <= reserve2, "Insufficient reserves");

        // Transfer tokens back to user
        IERC20(token1).transfer(msg.sender, amount1);
        IERC20(token2).transfer(msg.sender, amount2);

        // Update reserves
        reserve1 -= amount1;
        reserve2 -= amount2;

        emit RemoveLiquidity(msg.sender, amount1, amount2);
    }

    // Swap tokens
    function swap(address tokenIn, uint256 amountIn) external nonReentrant returns (uint256 amountOut) {
        require(tokenIn == token1 || tokenIn == token2, "Invalid token");
        require(amountIn > 0, "Amount must be greater than 0");

        address tokenOut = tokenIn == token1 ? token2 : token1;
        uint256 reserveIn = tokenIn == token1 ? reserve1 : reserve2;
        uint256 reserveOut = tokenIn == token1 ? reserve2 : reserve1;

        // Calculate output amount using constant product formula
        amountOut = (amountIn * reserveOut) / (reserveIn + amountIn);

        require(amountOut > 0, "Insufficient output amount");
        require(amountOut <= reserveOut, "Insufficient liquidity");

        // Transfer tokens
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        IERC20(tokenOut).transfer(msg.sender, amountOut);

        // Update reserves
        if (tokenIn == token1) {
            reserve1 += amountIn;
            reserve2 -= amountOut;
        } else {
            reserve2 += amountIn;
            reserve1 -= amountOut;
        }

        emit Swap(msg.sender, tokenIn, tokenOut, amountIn, amountOut);
    }

    // Get quote for swap
    function getQuote(address tokenIn, uint256 amountIn) external view returns (uint256 amountOut) {
        require(tokenIn == token1 || tokenIn == token2, "Invalid token");
        require(amountIn > 0, "Amount must be greater than 0");

        uint256 reserveIn = tokenIn == token1 ? reserve1 : reserve2;
        uint256 reserveOut = tokenIn == token1 ? reserve2 : reserve1;

        amountOut = (amountIn * reserveOut) / (reserveIn + amountIn);
    }
} 