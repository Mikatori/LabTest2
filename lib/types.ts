// Module Types
export type ModuleType = 'COD' | 'BOD';

// Mode Types
export type PracticeMode = 'guided' | 'practice';

// Equipment Types
export type EquipmentType =
  | 'pipette'
  | 'beaker'
  | 'flask'
  | 'codTube'
  | 'bodBottle'
  | 'spectrophotometer'
  | 'doMeter'
  | 'heater'
  | 'incubator'
  | 'gloves'
  | 'goggles'
  | 'chemicalBottle'
  | 'testTube';

// Chemical Types
export type ChemicalType =
  | 'waterSample'
  | 'K2Cr2O7'
  | 'H2SO4_Ag2SO4'
  | 'nutrientSolution'
  | 'microorganismSolution'
  | 'none';

// Error Types
export type ErrorType = 'safety' | 'procedure' | 'measurement' | 'warning';

// Step Status
export type StepStatus = 'pending' | 'inProgress' | 'completed';

// Error Interface
export interface LabError {
  id: string;
  step: number;
  type: ErrorType;
  message: string;
  timestamp: number;
  resolved?: boolean;
}

// Measurement Interface
export interface Measurements {
  volume?: number;
  k2cr2o7Volume?: number;
  h2so4Volume?: number;
  temperature?: number;
  do0?: number;
  do5?: number;
  absorbance?: number;
  cod?: number;
  bod5?: number;
  bodVolume?: number;
  incubatorTemperature?: number;
  isCapped?: boolean;
  isShaken?: boolean;
  isIncubated?: boolean;
  heatingComplete?: boolean;
  incubationComplete?: boolean;
  hasNutrient?: boolean;
  hasMicroorganism?: boolean;
  hasBubbles?: boolean;
  time?: number;
}

// Score Interface
export interface Score {
  accuracy: number;
  safety: number;
  efficiency: number;
  total: number;
}

// Equipment State
export interface EquipmentState {
  id: string;
  type: EquipmentType;
  position: [number, number, number];
  rotation: [number, number, number];
  content: ChemicalType;
  volume?: number;
  temperature?: number;
  isLocked?: boolean;
  isCapped?: boolean;
  isSelected?: boolean;
}

// Step Definition
export interface Step {
  id: number;
  title: string;
  description: string;
  hint?: string;
  status: StepStatus;
  validation?: (state: LabState) => { valid: boolean; error?: string };
}

// COD Steps
export const COD_STEPS: Step[] = [
  {
    id: 1,
    title: 'Chuẩn bị an toàn',
    description: 'Đeo găng tay và kính bảo hộ trước khi làm việc',
    hint: 'Click vào găng tay và kính trong tủ dụng cụ',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Lấy mẫu nước',
    description: 'Dùng pipette lấy 2.5ml mẫu nước vào ống COD',
    hint: 'Click vào beaker chứa mẫu nước, sau đó click vào pipette',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Thêm K₂Cr₂O₇',
    description: 'Thêm 1.5ml K₂Cr₂O₇ 0.25N vào ống COD',
    hint: 'Chọn chai K₂Cr₂O₇ từ tủ hóa chất',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Thêm H₂SO₄-Ag₂SO₄',
    description: 'Thêm 3.5ml H₂SO₄ chứa Ag₂SO₄ vào ống COD',
    hint: 'Chọn chai H₂SO₄ từ tủ hóa chất',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Đậy nắp và lắc',
    description: 'Đậy nắp ống COD và lắc đều',
    hint: 'Click vào nắp ống để đậy, sau đó click vào ống để lắc',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Đun nóng',
    description: 'Đặt ống vào bếp đun ở 150°C trong 2 giờ',
    hint: 'Kéo thả ống vào bếp đun và điều chỉnh nhiệt độ',
    status: 'pending',
  },
  {
    id: 7,
    title: 'Làm nguội',
    description: 'Làm nguội ống xuống dưới 40°C',
    hint: 'Lấy ống ra khỏi bếp và đợi làm nguội',
    status: 'pending',
  },
  {
    id: 8,
    title: 'Đo và tính COD',
    description: 'Đặt ống vào spectrophotometer để đo absorbance',
    hint: 'Kéo thả ống vào spectrophotometer',
    status: 'pending',
  },
];

// BOD Steps
export const BOD_STEPS: Step[] = [
  {
    id: 1,
    title: 'Chuẩn bị an toàn',
    description: 'Đeo găng tay và kính bảo hộ trước khi làm việc',
    hint: 'Click vào găng tay và kính trong tủ dụng cụ',
    status: 'pending',
  },
  {
    id: 2,
    title: 'Chuẩn bị mẫu nước',
    description: 'Lấy mẫu nước và thêm chất dinh dưỡng, vi sinh vật',
    hint: 'Click vào beaker chứa mẫu nước, sau đó thêm các dung dịch',
    status: 'pending',
  },
  {
    id: 3,
    title: 'Đổ vào chai BOD',
    description: 'Đổ mẫu đã chuẩn bị vào chai BOD 300ml',
    hint: 'Click vào beaker để đổ vào chai BOD',
    status: 'pending',
  },
  {
    id: 4,
    title: 'Đo DO ban đầu (DO₀)',
    description: 'Nhúng đầu dò DO meter vào chai và đo DO₀',
    hint: 'Click vào DO meter và nhúng vào chai BOD',
    status: 'pending',
  },
  {
    id: 5,
    title: 'Đậy nắp và bảo quản',
    description: 'Đậy nắp kín chai BOD và đặt vào tủ ủ',
    hint: 'Click vào nắp chai để đậy, sau đó đặt vào tủ ủ',
    status: 'pending',
  },
  {
    id: 6,
    title: 'Ủ 5 ngày',
    description: 'Ủ chai BOD ở 20°C trong 5 ngày',
    hint: 'Đặt chai vào tủ ủ và đợi 5 ngày',
    status: 'pending',
  },
  {
    id: 7,
    title: 'Đo DO sau 5 ngày (DO₅)',
    description: 'Lấy chai ra và đo DO₅',
    hint: 'Click vào DO meter và nhúng vào chai BOD',
    status: 'pending',
  },
];

// Main Lab State Interface
export interface LabState {
  // Module Info
  currentModule: ModuleType;
  currentStep: number;
  mode: PracticeMode;
  isComplete: boolean;

  // Safety
  hasGloves: boolean;
  hasGoggles: boolean;

  // Measurements
  measurements: Measurements;

  // Errors
  errors: LabError[];

  // Score
  score: Score;

  // Time
  startTime: number;
  elapsedTime: number;

  // Actions
  setModule: (module: ModuleType) => void;
  setMode: (mode: PracticeMode) => void;
  nextStep: () => void;
  previousStep: () => void;
  goToStep: (step: number) => void;
  completeStep: (step: number) => void;
  resetModule: () => void;
  resetAll: () => void;

  // Safety Actions
  toggleGloves: () => void;
  toggleGoggles: () => void;

  // Measurement Actions
  setMeasurement: (key: keyof Measurements, value: number | boolean) => void;

  // Error Actions
  addError: (error: Omit<LabError, 'id' | 'timestamp'>) => void;
  resolveError: (errorId: string) => void;
  clearErrors: () => void;

  // Score Actions
  calculateScore: () => void;

  // Time Actions
  startTimer: () => void;
  stopTimer: () => void;
  updateElapsedTime: () => void;
}
