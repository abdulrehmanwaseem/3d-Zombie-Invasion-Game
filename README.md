# 🧟 Zombie Invasion Game

![Zombie Invasion Banner](https://github.com/user-attachments/assets/8d7cbefa-d84d-4b85-9dce-87803e54d649)

A thrilling 3D zombie survival game built with React, Three.js, and React Three Fiber. Navigate through a post-apocalyptic city environment while avoiding zombie hordes in this immersive web-based game.

## 🎮 Live Demo

[Play the Game](http://zombie-invasion-three.vercel.app/)

## ✨ Features

- **Immersive 3D Environment**: Explore a detailed city environment with buildings, cars, and atmospheric effects
- **Realistic Physics**: Powered by React Three Rapier for authentic movement and collisions
- **Character Controls**: Smooth character movement with walking, running, jumping, and combat animations
- **Atmospheric Effects**:
  - Dynamic UFO with animated beam
  - Floating particles
  - Fog effects
  - Ambient lighting
- **Sound Design**: Background music and positional audio for enhanced immersion
- **Mobile Support**: Touch controls with on-screen joystick for mobile devices
- **Performance Options**: Toggle shadows and FPS counter for optimal performance
- **Pakistani Theme**: Features Pakistani flags in the environment

## 🚀 Technologies Used

- **React** (v19.1.0) - UI framework
- **Three.js** (v0.177.0) - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for React Three Fiber
- **React Three Rapier** - Physics engine integration
- **TypeScript** - Type safety and better developer experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Ecctrl** - Character controller for Three.js

## 🎯 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/abdulrehmanwaseem/3d-Zombie-Invasion-Game.git
cd 3d-Zombie-Invasion-Game
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The build output will be in the `dist` directory.

## 🎮 Controls

### Keyboard Controls

| Action        | Keys       |
| ------------- | ---------- |
| **Movement**  |            |
| Move Forward  | `W` or `↑` |
| Move Backward | `S` or `↓` |
| Move Left     | `A` or `←` |
| Move Right    | `D` or `→` |
| Jump          | `Space`    |
| Run/Sprint    | `Shift`    |
| **Combat**    |            |
| Melee Attack  | `F`        |
| Kick Attack   | `E`        |
| **Other**     |            |
| Emote         | `1`        |
| Pause Menu    | `Tab`      |

### Mobile Controls

- Use the on-screen joystick for movement
- Touch buttons for actions

## 🛠️ Configuration

### Graphics Settings

You can adjust the following settings in-game:

- **Shadows**: Toggle shadow rendering for better performance
- **FPS Counter**: Show/hide performance statistics

Access settings from the main menu or press `Tab` during gameplay.

## 📁 Project Structure

```
zombie-invasion-game/
├── public/
│   ├── models/          # 3D models and textures
│   │   ├── character.glb
│   │   ├── invasion_environment.glb
│   │   ├── pakistan_flag.glb
│   │   └── Textures/
│   ├── images/          # UI images
│   └── sounds/          # Audio files
├── src/
│   ├── components/      # React components
│   │   ├── AtmosphericEffects.tsx
│   │   ├── Character.tsx
│   │   ├── ControlsModal.tsx
│   │   ├── Experience.tsx
│   │   ├── Invasion_environment.tsx
│   │   ├── Pakistan_flag.tsx
│   │   ├── SettingsModal.tsx
│   │   ├── StartMenu.tsx
│   │   └── ZombieLoadingScreen.tsx
│   ├── data/           # Configuration files
│   │   ├── animationSet.json
│   │   └── keyboardMap.json
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🎨 Features in Detail

### Environment

- Detailed city environment with multiple buildings
- Police station centerpiece
- Scattered vehicles and urban props
- Dynamic billboards with game branding

### Visual Effects

- UFO hovering above the city with animated beam
- Floating particle system
- Atmospheric fog
- Dynamic lighting including ambient, directional, and spot lights

### Character System

- Animated character with multiple actions
- Smooth transitions between animations
- Physics-based movement
- Combat system with melee and kick attacks

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Adding New Features

1. **New 3D Models**: Place `.glb` files in `public/models/`
2. **New Animations**: Update `src/data/animationSet.json`
3. **New Controls**: Modify `src/data/keyboardMap.json`
4. **New Components**: Add to `src/components/`

## 🐛 Known Issues

- Performance may vary on lower-end devices
- Mobile controls might need adjustment based on screen size
- Some animations may not trigger correctly on rapid input

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Credits

- **Developer**: Abdul Rehman
- **3D Models**: Custom and community assets
- **Sound Effects**: Background ambience and effects
- **Inspiration**: Classic zombie survival games

## 📞 Contact

Abdul Rehman - [GitHub Profile](https://github.com/abdulrehmanwaseem)

Project Link: [https://github.com/abdulrehmanwaseem/3d-Zombie-Invasion-Game](https://github.com/abdulrehmanwaseem/3d-Zombie-Invasion-Game)

---

<p align="center">Made with ❤️ by Abdul Rehman</p>
<p align="center">© 2025 Zombie Invasion. All rights reserved.</p>
