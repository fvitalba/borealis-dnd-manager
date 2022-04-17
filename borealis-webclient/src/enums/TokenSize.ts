enum TokenSize {
    'tiny' = 10,
    'small' = 25,
    'medium' = 50,
    'large' = 75,
    'huge' = 100,
    'gargantuan' = 150,
}

export type TokenSizeType = 'tiny' | 'small' | 'medium' | 'large' | 'huge' | 'gargantuan'
export const TokenSizeArray: Array<TokenSizeType> = ['tiny', 'small', 'medium', 'large', 'huge', 'gargantuan']

export default TokenSize
