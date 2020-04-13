import { SAVE_AFFIRMATION_REPORT } from './types';

export function saveAffirmationReport(affirmation) {
    return {
        type: SAVE_AFFIRMATION_REPORT,
        payload: affirmation
    };
}