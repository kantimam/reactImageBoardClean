#pragma once
#include "Block.h"
#include <SFML/Graphics.hpp>
#include <iostream>
#include <chrono>
#include <thread>


class Tetris
{
public:
	int** worldArray;
	int dimX;
	int dimY;
	int fallSpeed = 1000 / 2;
	bool gameRunning = false;

	std::thread updateThread;

	float border = 2.f;

	float blockSize = 40.f;
	int blockOffsetX = 0;
	int blockOffsetY = 0;
	int blockType = 0;
	int blockRotation = 0;
	Block block;



	// constructor
	Tetris(int dimX, int dimY, int windowWidth, int windowHeight) : block() {
		this->dimX = dimX;
		this->dimY = dimY;

		blockSize = (windowWidth / dimX) < (windowHeight / dimY) ? windowWidth / dimX : windowHeight / dimY;

		worldArray = new int* [dimY];
		for (int y = 0; y < dimY; y++) {
			worldArray[y] = new int[dimX];
			//fill row right after creating it
			for (int x = 0; x < dimX; x++) {
				worldArray[y][x] = 8;
			}
		}

	}
	~Tetris() {
		for (int y = 0; y < dimY; y++) {
			delete[] worldArray[y];
		}
		delete[] worldArray;
	}
	// call once to init game
	void startGame() {
		newBlock();
		gameRunning = true;
		updateThread = std::thread(&Tetris::update, this);
		
	};

	void pauseGame() {
		gameRunning = false;
		updateThread.join();
	}
	void unpauseGame() {
		gameRunning = true;
		updateThread = std::thread(&Tetris::update, this);
	}

	void closeGame() {
		gameRunning = false;
		updateThread.join();
	}
	// call every frame
	void render(sf::RenderWindow& windowRef) {
		drawWorld(windowRef);
		drawBlock(windowRef);
		
	}

	// call instantly on nevent
	void moveRight() {
		moveRightIfValid();
	}
	void moveLeft() {
		moveLeftIfValid();
	}
	void rotate() {
		rotateIfValid();
	}
	void moveDown() {
		updatePosY();
	}



private:
	void newBlock() {
		blockType = randomRange(0, 7);
		blockRotation = randomRange(0, 3);
		blockOffsetX = block.getInitialPosX(blockType, blockRotation) + floor(dimX / 2);
		blockOffsetY = block.getInitialPosY(blockType, blockRotation);
	}

	void update() {
		using namespace std::chrono;
		time_point<system_clock> time=system_clock::now();
		while (gameRunning) {
			updatePosY();
			time += milliseconds(fallSpeed);
			std::this_thread::sleep_until(time);
		}
		
	}

	int randomRange(int start, int end) {
		return (rand() % (end - start)) + start;
	}
	bool inBoundsCheck(int x, int y) {
		return ((x + blockOffsetX >= 0) && (y + blockOffsetY >= 0));
	}

	bool hasBlock(int x, int y, int currentRotation) {
		return block.getBlock(blockType, currentRotation%4, x, y) > 0;
	}
	bool blockCollided(int x, int y) {
		if (inBoundsCheck(x, y)) {
			if (((1 + y + blockOffsetY) >= dimY) || (worldArray[y + blockOffsetY + 1][x + blockOffsetX] < 8)) {
				return true;
			}
		}
		return false;
			
	}
	void moveRightIfValid() {
		for (int y = 0; y < 5; y++) {
			for (int x = 0; x < 5; x++) {
				if (hasBlock(x, y, blockRotation)) {
					if (inBoundsCheck(x, y)) {
						if (((1 + x + blockOffsetX) >= dimX) || (worldArray[y + blockOffsetY][x + blockOffsetX + 1] < 8)) {
							return;
						}
					}
				}

			}
		}
		blockOffsetX ++;

	}

	void moveLeftIfValid() {
		for (int y = 0; y < 5; y++) {
			for (int x = 0; x < 5; x++) {
				if (hasBlock(x, y, blockRotation)) {
					if (inBoundsCheck(x, y)) {
						if (((x + blockOffsetX -1) < 0) || (worldArray[y + blockOffsetY][x + blockOffsetX -1] < 8)) {
							return;
						}
					}
				}

			}
		}
		blockOffsetX --;

	}

	void rotateIfValid() {
		for (int y = 0; y < 5; y++) {
			for (int x = 0; x < 5; x++) {
				if (hasBlock(x, y, blockRotation+1)) {
					if (blockOffsetY + y < 0) {
						return;
					}
					if (blockCollided(x, y)) {
						return;
					}
					if (((x + blockOffsetX) >= dimX) || (worldArray[y + blockOffsetY][x + blockOffsetX] < 8)) {
						return;
					}
					if (((x + blockOffsetX) < 0) || (worldArray[y + blockOffsetY][x + blockOffsetX] < 8)) {
						return;
					}
				}

			}
		}
		blockRotation=(blockRotation + 1) % 4;
	}


	void updatePosY() {
		for (int y = 0; y < 5; y++) {
			for (int x = 0; x < 5; x++) {
				if (hasBlock(x, y, blockRotation)) {
					if (blockCollided(x,y)) {
						blockLanded();
						return;
					}
				}

			}
		}
		blockOffsetY++;
	}

	void checkRows() {
		for (int y = 0; y < dimY; y++) {
			bool rowFilled = true;
			for (int x = 0; x < dimX; x++) {
				if (worldArray[y][x] == 8) {
					rowFilled = false;
					break;
				}
			}
			if (rowFilled) {
				clearRow(y);
			}
		}
	}

	void clearRow(int targetRow) {
		for (int y = targetRow; y > 0 ; y--) {
			for (int x = 0; x < dimX; x++) {
				worldArray[y][x] = worldArray[y - 1][x];
			}
		}
	}


	void drawWorld(sf::RenderWindow& windowRef) {
		
		float sizeNoBorder = blockSize - border;

		sf::RectangleShape shape(sf::Vector2f(sizeNoBorder, sizeNoBorder));

		shape.setOutlineThickness(border);
		shape.setOutlineColor(sf::Color(250, 150, 100));
			
		for (int y = 0; y < dimY; y++) {
			for (int x = 0; x < dimX; x++) {

				int* currentColor = block.getBlockColor(worldArray[y][x]);
				shape.setFillColor(sf::Color(currentColor[0], currentColor[1], currentColor[2], currentColor[3]));
				shape.setPosition({ (x * blockSize), (y * blockSize) });
					
				windowRef.draw(shape);
			}
		}

	};
	void drawBlock(sf::RenderWindow& windowRef) {
		float sizeNoBorder = blockSize - border;
		sf::RectangleShape shape(sf::Vector2f(sizeNoBorder, sizeNoBorder));
		shape.setOutlineThickness(border);
		shape.setOutlineColor(sf::Color(250, 150, 100));
		int *currentColor = block.getBlockColor(blockType);
		shape.setFillColor(sf::Color(currentColor[0], currentColor[1], currentColor[2], currentColor[3]));
		for (int y = 0; y < 5; y++) {
			for (int x = 0; x < 5; x++) {
				if (block.getBlock(blockType, blockRotation, x, y) > 0) {
					shape.setPosition({ ((x + blockOffsetX) * blockSize), ((y + blockOffsetY) * blockSize) });
					windowRef.draw(shape);
				}

			}
		}

	};


	void blockLanded() {
		for (int y = 0; y < 5; y++) {
			for (int x = 0; x < 5; x++) {
				if (block.getBlock(blockType, blockRotation, x, y) > 0) {
					if (inBoundsCheck(x, y)) {
						worldArray[y + blockOffsetY][x + blockOffsetX] = blockType;
					}
					
				}

			}
		}
		checkRows();
		newBlock();
	}
};

