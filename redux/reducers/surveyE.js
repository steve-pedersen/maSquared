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
  "2a1": { value: null, label: 'Woman' }, 
  "2a2": { value: null, label: 'Man' }, 
  "2a3": { value: null, label: 'Transgender' }, 
  "2a4": { value: null, label: 'Genderqueer' }, 
  "2a5": { value: null, label: 'Agender' }, 
  "2a6": { value: null, label: 'Aggressive' }, 
  "2a7": { value: null, label: 'Androgynist' }, 
  "2a8": { value: null, label: 'Bigender' }, 
  "2a9": { value: null, label: 'Butch' }, 
  "2a10": { value: null, label: 'CrossDresser' }, 
  "2a11": { value: null, label: 'DragKing' }, 
  "2a12": { value: null, label: 'DragQueen' }, 
  "2a13": { value: null, label: 'DifferentlyGendered' }, 
  "2a14": { value: null, label: 'FluidGenderIdentity' }, 
  "2a15": { value: null, label: 'FTM' }, 
  "2a16": { value: null, label: 'GenderBlender' }, 
  "2a17": { value: null, label: 'Intergender' }, 
  "2a18": { value: null, label: 'Intersex' }, 
  "2a19": { value: null, label: 'MTF' }, 
  "2a20": { value: null, label: 'Neutro' }, 
  "2a21": { value: null, label: 'Non-op Transexual' }, 
  "2a22": { value: null, label: 'Omnigender' }, 
  "2a23": { value: null, label: 'Pre-op Transexual' }, 
  "2a24": { value: null, label: 'Post-op Transexual' }, 
  "2a25": { value: null, label: 'Post-gender' }, 
  "2a26": { value: null, label: 'Queer' }, 
  "2a27": { value: null, label: 'Stud' }, 
  "2a28": { value: null, label: 'Trans Man' }, 
  "2a29": { value: null, label: 'Trans Woman' }, 
  "2a30": { value: null, label: 'Two-spirit' }, 
  "2a31": { value: null, label: 'Other' }, 
  "2a31Other": { value: null, label: 'Other Text' }, 
  "2a32": { value: null, label: 'Not Applicable' }, 
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