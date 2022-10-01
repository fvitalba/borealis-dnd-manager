import IIncMap from '../../src/incomingInterfaces/incMap'
import { IMapSchema } from '../../src/models/map'
import { initialRooms } from './initial.rooms'

export const initialMaps: Array<IMapSchema> = [
    {
        id: 0,
        name: 'First Map',
        roomId: initialRooms[2].roomId,
        height: 640,
        width: 800,
        x: 0,
        y: 0,
        fogPaths: [],
        drawPaths: [],
        backgroundUrl: 'https://dnd-maps.com/wp-content/uploads/Encounter-1-9fc2c38b-scaled.jpg',
        timestamp: (new Date()).getMilliseconds(),
    },
    {
        id: 1,
        name: 'Second Map',
        roomId: initialRooms[2].roomId,
        height: 640,
        width: 800,
        x: 0,
        y: 0,
        fogPaths: [],
        drawPaths: [],
        backgroundUrl: 'https://dnd-maps.com/wp-content/uploads/Customs-fort-at-a-river-crossing-50x55-social-grid-484e6310-scaled.jpg',
        timestamp: (new Date()).getMilliseconds(),
    },
    {
        id: 2,
        name: 'Third Map (Invalid link)',
        roomId: initialRooms[2].roomId,
        height: 640,
        width: 800,
        x: 0,
        y: 0,
        fogPaths: [],
        drawPaths: [],
        backgroundUrl: 'blablabla',
        timestamp: (new Date()).getMilliseconds(),
    },
    {
        id: 0,
        name: 'Second First Map (Invalid link)',
        roomId: initialRooms[0].roomId,
        height: 640,
        width: 800,
        x: 0,
        y: 0,
        fogPaths: [],
        drawPaths: [],
        backgroundUrl: 'blablabla',
        timestamp: (new Date()).getMilliseconds(),
    },
    {
        id: 1,
        name: 'Second Second Map',
        roomId: initialRooms[0].roomId,
        height: 640,
        width: 800,
        x: 0,
        y: 0,
        fogPaths: [],
        drawPaths: [],
        backgroundUrl: 'https://i.pinimg.com/474x/54/0a/a4/540aa468c3d625f06c739f02d9b69cdb.jpg',
        timestamp: (new Date()).getMilliseconds(),
    }
]

export const newMap: IIncMap = {
    id: 7,
    name: 'New Map',
    backgroundUrl: 'https://dnd-maps.com/wp-content/uploads/Finnigan16s-Comfy-Cabin-01-c72ad5af.png',
    drawPaths: [],
    fogPaths: [],
    height: 640,
    width: 800,
    x: 0,
    y: 0,
}
