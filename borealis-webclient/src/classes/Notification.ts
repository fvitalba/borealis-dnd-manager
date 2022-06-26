import NotificationType from '../enums/NotificationType'

class Notification {
    public title: string
    public content: string
    public type: NotificationType

    public constructor(newTitle: string, newContent: string, newType: NotificationType) {
        this.title = newTitle
        this.content = newContent
        this.type = newType
    }
}

export default Notification
