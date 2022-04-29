import Point from './Point'

class Cursor extends Point{
    public username: string

    public constructor(newUsername: string, newX: number, newY: number) {
        super(newX, newY)
        this.username = newUsername
    }

    public copy(): Cursor {
        const cursorCopy = new Cursor(this.username, this.x, this.y)
        return cursorCopy
    }
}

export default Cursor
