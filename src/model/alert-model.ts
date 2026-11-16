let nextAlertId = 0

export class AlertModel {
    public readonly id: number = ++nextAlertId

    constructor(
        public type: string,
        public text: string
    ) {
    }
}
