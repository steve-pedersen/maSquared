import { 
  SAVE_SURVEY_E,
  RESET_SURVEY_E
} from '../actions/types';


const INITIAL_STATE = {
  1: { value: null },
  2: { value: null },
  3: { value: null },
  "3a": { value: null },
  4: { value: null },
  "4other": { value: null },
  "5a": { value: null },
  "5b": { value: null },
  "5c": { value: null },
  "5d": { value: null },
  "5e": { value: null },
  "5f": { value: null },
  "5g": { value: null },
  "5gOther": { value: null },
  "2a1": { value: null }, // Woman
  "2a2": { value: null }, // Man
  "2a3": { value: null }, // Transgender
  "2a4": { value: null }, // Genderqueer
  "2a5": { value: null }, // Agender
  "2a6": { value: null }, // Aggressive
  "2a7": { value: null }, // Androgynist
  "2a8": { value: null }, // Bigender
  "2a9": { value: null }, // Butch
  "2a10": { value: null }, // CrossDresser
  "2a11": { value: null }, // DragKing
  "2a12": { value: null }, // DragQueen
  "2a13": { value: null }, // DifferentlyGendered
  "2a14": { value: null }, // FluidGenderIdentity
  "2a15": { value: null }, // FTM
  "2a16": { value: null }, // GenderBlender
  "2a17": { value: null }, // Intergender
  "2a18": { value: null }, // Intersex
  "2a19": { value: null }, // MTF
  "2a20": { value: null }, // Neutro
  "2a21": { value: null }, // Non-op Transexual
  "2a22": { value: null }, // Omnigender
  "2a23": { value: null }, // Pre-op Transexual
  "2a24": { value: null }, // Post-op Transexual
  "2a25": { value: null }, // Post-gender
  "2a26": { value: null }, // Queer
  "2a27": { value: null }, // Stud
  "2a28": { value: null }, // Trans Man
  "2a29": { value: null }, // Trans Woman
  "2a30": { value: null }, // Two-spirit
  "2a31": { value: null }, // Other
  "2a31Other": { value: null }, // Other Text
  "2a32": { value: null }, // Not Applicable
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SAVE_SURVEY_E:
      return { ...state, ...action.payload };
    case RESET_SURVEY_E:
      return INITIAL_STATE;
    default:
      return state;
  }
};