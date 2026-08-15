CREATE TABLE `missionProgress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`currentStep` int NOT NULL DEFAULT 1,
	`unlockedAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `missionProgress_id` PRIMARY KEY(`id`),
	CONSTRAINT `missionProgress_userId_unique` UNIQUE(`userId`)
);
