# Virtual Lab BOD & COD Measurement

A comprehensive interactive web application for teaching students how to measure Biochemical Oxygen Demand (BOD) and Chemical Oxygen Demand (COD) in water samples using 3D simulation.

## 🌟 Features

### Modules
- **COD Module** (8 steps): Complete COD measurement workflow
- **BOD Module** (7 steps): Complete BOD measurement workflow

### Interactive Features
- **3D Virtual Lab**: Realistic lab environment powered by Three.js and React Three Fiber
- **Step-by-step Guidance**: Interactive instructions with hints and validation
- **Real-time Validation**: Immediate feedback on actions with detailed error messages
- **Scoring System**: Three-component scoring (Accuracy, Safety, Efficiency)
- **Practice Modes**: Guided mode with hints and Practice mode for independent work
- **Safety Training**: Emphasis on proper safety equipment usage

### Equipment & Chemicals
- **COD Equipment**: Pipettes, beakers, COD tubes, heater, spectrophotometer
- **BOD Equipment**: BOD bottles, DO meter, incubator
- **Chemicals**: K₂Cr₂O₇, H₂SO₄-Ag₂SO₄, nutrients, microorganisms
- **Safety Gear**: Gloves and goggles with interactive donning

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or download the project**
   ```bash
   cd C:\Users\canht\.vscode\COD.BOD
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
COD.BOD/
├── app/                          # Next.js app directory
│   ├── lab/
│   │   ├── cod/                  # COD module page
│   │   └── bod/                  # BOD module page
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Landing page
│   └── globals.css               # Global styles
│
├── components/                    # React components
│   ├── LabWorkspace.tsx          # Main workspace
│   ├── LabCanvas.tsx             # Three.js canvas wrapper
│   ├── LabScene.tsx              # Main 3D scene
│   ├── ControlPanel.tsx          # Step control panel
│   ├── BottomBar.tsx             # Inventory & measurements
│   ├── ErrorModal.tsx            # Error popup
│   ├── ScoreModal.tsx            # Results modal
│   └── objects/                  # 3D lab objects
│       ├── LabTable.tsx
│       ├── Beaker.tsx
│       ├── Pipette.tsx
│       ├── CODTube.tsx
│       ├── BODBottle.tsx
│       ├── ChemicalCabinet.tsx
│       ├── EquipmentCabinet.tsx
│       ├── Heater.tsx
│       ├── Incubator.tsx
│       ├── Spectrophotometer.tsx
│       ├── DOMeter.tsx
│       └── SafetyEquipment.tsx
│
├── lib/                          # Core libraries
│   ├── types.ts                  # TypeScript definitions
│   ├── store.ts                  # Zustand state management
│   ├── validators.ts             # Step validation logic
│   └── constants.ts              # Constants & configuration
│
└── hooks/                        # Custom React hooks
    ├── useCODLab.ts             # COD workflow logic
    └── useBODLab.ts             # BOD workflow logic
```

## 🎯 Usage Guide

### Starting a Lab Session

1. **Choose Module**: Select COD or BOD from the landing page
2. **Select Mode**: Choose Guided (with hints) or Practice mode
3. **Follow Steps**: Complete each step according to instructions
4. **View Results**: See your score and completion time at the end

### Controls

- **Mouse Left Click**: Select objects, interact with equipment
- **Mouse Drag**: Rotate camera view
- **Mouse Scroll**: Zoom in/out
- **Navigation Buttons**: Previous/Next steps in control panel
- **Hint Button**: Get contextual hints for current step

### COD Workflow (8 Steps)

1. **Safety Preparation**: Don gloves and goggles
2. **Sample Collection**: Pipette 2.5ml water sample
3. **Add K₂Cr₂O₇**: Add 1.5ml potassium dichromate
4. **Add H₂SO₄-Ag₂SO₄**: Add 3.5ml sulfuric acid catalyst
5. **Cap & Shake**: Seal tube and mix thoroughly
6. **Heating**: Heat at 150°C for 2 hours
7. **Cooling**: Cool to below 40°C
8. **Measurement**: Measure absorbance at 600nm

### BOD Workflow (7 Steps)

1. **Safety Preparation**: Don gloves and goggles
2. **Sample Preparation**: Add nutrients and microorganisms
3. **Fill BOD Bottle**: Fill 300ml without bubbles
4. **Measure DO₀**: Measure initial dissolved oxygen
5. **Cap & Incubate**: Seal bottle and place in incubator
6. **Incubation**: Incubate at 20°C for 5 days
7. **Measure DO₅**: Measure final dissolved oxygen

## 🧪 Scoring System

### Score Components

1. **Accuracy (40 points)**
   - Based on completed steps
   - Deductions for measurement errors

2. **Safety (30 points)**
   - Starting points: 30
   - -5 points per safety violation

3. **Efficiency (30 points)**
   - Based on completion time
   - Expected times: COD (20 min), BOD (15 min)
   - Penalties for exceeding expected time

### Grade Scale
- **90+**: Xuất sắc (Excellent) 🏆
- **80-89**: Giỏi (Very Good) 🌟
- **70-79**: Khá (Good) 👍
- **60-69**: Trung bình (Average) 📝
- **<60**: Cần cố gắng (Needs Improvement) 💪

## 🔧 Configuration

### Time Scaling

The application uses fast-forward multipliers for long processes:

```typescript
TIME_SCALE: {
  NORMAL: 1,              // Real-time
  FAST: 60,               // 60x for COD heating (2 hours → 2 minutes)
  ULTRA_FAST: 1440        // 1440x for BOD incubation (5 days → 5 minutes)
}
```

### Validation Tolerances

```typescript
COD: {
  SAMPLE_VOLUME: 2.5 ± 0.1 ml
  K2CR2O7_VOLUME: 1.5 ± 0.1 ml
  H2SO4_VOLUME: 3.5 ± 0.1 ml
  HEATING_TEMPERATURE: 150 ± 2°C
}

BOD: {
  BOTTLE_VOLUME: 300 ± 5 ml
  INCUBATOR_TEMPERATURE: 20 ± 1°C
}
```

## 🚢 Deployment to GitHub Pages

### Build Configuration

The project is configured for static export via `next.config.js`:

```javascript
module.exports = {
  output: 'export',
  images: { unoptimized: true },
}
```

### Deployment Steps

1. **Build the project**
   ```bash
   npm run build
   ```

2. **The build output will be in `/out` directory**

3. **Deploy to GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (or use GitHub Actions)

4. **Or use GitHub Actions**
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: npm install
         - run: npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript (strict mode)
- **3D Graphics**: Three.js + React Three Fiber + Drei
- **State Management**: Zustand
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: GitHub Pages (static export)

## 📝 Development Notes

### Adding New Steps

1. Update step definitions in `lib/types.ts`
2. Add validator in `lib/validators.ts`
3. Implement logic in appropriate hook (`useCODLab.ts` or `useBODLab.ts`)
4. Update constants in `lib/constants.ts` if needed

### Customizing Equipment

To modify 3D objects, edit files in `components/objects/`:
- Adjust geometry parameters
- Change materials and colors
- Add animations via `useFrame` hook
- Implement interaction handlers

## 🐛 Troubleshooting

### Common Issues

**Build fails with TypeScript errors**
- Ensure all dependencies are installed: `npm install`
- Check TypeScript version compatibility
- Verify all imports use correct paths (`@/` alias)

**3D scene not rendering**
- Check browser console for WebGL errors
- Ensure Three.js dependencies are compatible
- Verify canvas dimensions are set correctly

**State not updating**
- Check Zustand store implementation
- Verify component is using the store hook
- Look for stale closures in event handlers

## 📄 License

This project is created for educational purposes.

## 🤝 Contributing

Contributions are welcome! Areas for improvement:
- Additional lab modules
- More realistic physics simulations
- Enhanced particle effects
- Sound effects and voice guidance
- Mobile responsiveness improvements
- Accessibility enhancements

## 📧 Support

For issues or questions, please refer to the project documentation or create an issue in the repository.

---

**Version**: 1.0.0
**Last Updated**: 2025
