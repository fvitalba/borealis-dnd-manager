enum DiceType {
    'd4' = 4,
    'd6' = 6,
    'd8' = 8,
    'd10' = 10,
    'd12' = 12,
    'd20' = 20,
    'd100' = 100,
}

export type DiceTypeType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd100'
export const DiceTypeArray: Array<DiceTypeType> = ['d4', 'd6', 'd8', 'd10', 'd12', 'd100']

export default DiceType
