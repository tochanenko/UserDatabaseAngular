export class NotificationMessage {
	text!: string;
	type!: NotificationType;

	public constructor(text: string, type: NotificationType) {
		this.text = text;
		this.type = type;
	}
}

export enum NotificationType {
	ERROR,
	SUCCESS
}