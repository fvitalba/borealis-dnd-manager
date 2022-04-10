import Point from './Point'

class Cursor extends Point{
    public username: string

    public constructor(newUsername: string, newX: number, newY: number) {
        super(newX, newY)
        this.username = newUsername
    }
}

export default Cursor
