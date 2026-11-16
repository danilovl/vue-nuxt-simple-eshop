import transFilter from '@/plugins/filter/trans-filter'

const VALIDATOR_KEYS: Record<string, string> = {
    required: 'validation.required',
    email: 'validation.email',
    decimal: 'validation.number',
    minValue: 'validation.positive',
    minLength: 'validation.min_length',
    maxLength: 'validation.max_length',
    checked: 'validation.must_agree',
    url: 'validation.url'
}

type FieldState = {
    $dirty: boolean;
    $errors: { $validator: string; $params: object }[];
}

/**
 * Translated error messages of one vuelidate field. Messages are generated from the rule
 * parameters, so the text can never disagree with the actual rule (e.g. max length).
 */
export function validationMessages(field: FieldState): string[] {
    if (!field.$dirty) {
        return []
    }

    return field.$errors.map((error): string => {
        let message = transFilter(VALIDATOR_KEYS[error.$validator] ?? 'validation.invalid')
        for (const [name, value] of Object.entries(error.$params ?? {})) {
            message = message.replace(`{${name}}`, String(value))
        }

        return message
    })
}
