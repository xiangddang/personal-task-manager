# Personal Task Manager Application

## Overview
The Task Management App is a simple and intuitive React Native application designed to help users manage their daily tasks effectively. It supports both light and dark themes and is optimized for a wide range of devices, including iOS and Android. The app allows users to:

- Add, edit, and delete tasks.
- Mark tasks as "Pending" or "Completed."
- Search and filter tasks by queries and their status.
- Toggle between light and dark mode.

## Features
1. Light and Dark Themes: Users can toggle between themes for a comfortable user experience.
2. Task Management: Add, update, delete, and mark tasks as "Pending" or "Completed."
3. Search and Filter: Easily search for tasks by title and filter by status.
4. Cross-Device Compatibility: Optimized for various iOS and Android devices.


## Supporting Devices
### iOS
- iPhone SE (3rd generation)
- iPhone 15
- iPhone 15 Plus
- iPhone 15 Pro
- iPad Air
- iPad (10th generation)
- iPad mini (6th generation)
- iPad Pro (11-inch)

### Andriod
- Small Phone (4.65 720*1280 xhdpi)
- Medium Phone (6.4 1080*2400 420dpi)
- Pixel 9 Pro (6.3 1280*2856 xxhdpi)
- Pixel 9 Pro XL (1344*2992 xxhdpi)

## Prerequisites
- Expo CLI: Ensure you have the latest Expo CLI installed. You can install it using the following command:
```shell
npm install -g expo-cli
```

- Node.js: Version 14.x or above.

- React Native Environment: Make sure your development environment is set up for React Native.

## Installation

1. Clone the repository:
```shell
git clone https://github.com/xiangddang/personal-task-manager.git
```

2. Install dependencies:
```shell
npm install
```

3. Start the Expo development server by local CLI:
```shell
npx expo start
```

## Running the App

iOS

- Use the Expo Go app on your iOS device or the iOS simulator (e.g., iPhone SE, iPad Pro).
```shell
npx expo start --ios
```

Android

- Use the Expo Go app on your Android device or the Android emulator (e.g., Pixel 9 Pro).
```shell
npx expo start --android
```

## Project Structure
```
.
├── components
│   ├── TaskList.tsx        # Main task list component
│   ├── TaskItem.tsx        # Individual task component
│   ├── AddTaskModal.tsx    # Modal for adding tasks
│   ├── TaskScreenModal.tsx # Modal for task details
│   ├── ModalWrapper.tsx    # Modal for task details
├── data
│   ├── mockTasks.ts        # Mock tasks data
├── styles
│   ├── constants.ts        # Style constants (e.g., colors, spacing, fonts)
│   ├── theme.ts            # Light and dark themes
├── types
│   ├── Task.ts             # Task type interface
│   ├── TaskStatus.ts       # Enum for task status
├── utils
│   ├── storage.ts          # AsyncStorage helpers
├── app.json                # Expo app config
├── App.tsx                 # Main entry
├── index.ts                # Entry file for the React Native app
├── package.json            # Dependencies and scripts
├── package-lock.json       # Dependencies and scripts
└── README.md               # Documentation
```