enum TokenCondition {
    'Alive' = 0,
    'Blinded' = 1,
    'Charmed' = 2,
    'Deafened' = 3,
    'Frightened' = 4,
    'Grappled' = 5,
    'Incapacitated' = 6,
    'Invisible' = 7,
    'Paralyzed' = 8,
    'Petrified' = 9,
    'Poisoned' = 10,
    'Prone' = 11,
    'Restrained' = 12,
    'Stunned' = 13,
    'Unconscious' = 14,
    'Exhaustion 1' = 15,
    'Exhaustion 2' = 16,
    'Exhaustion 3' = 17,
    'Exhaustion 4' = 18,
    'Exhaustion 5' = 19,
    'Death' = 20
}

export const TokenConditionArray: Array<TokenCondition> = [TokenCondition.Alive, TokenCondition.Blinded, TokenCondition.Charmed, TokenCondition.Deafened, TokenCondition.Frightened,
    TokenCondition.Grappled, TokenCondition.Incapacitated, TokenCondition.Invisible, TokenCondition.Paralyzed, TokenCondition.Petrified, TokenCondition.Poisoned,
    TokenCondition.Prone, TokenCondition.Restrained, TokenCondition.Stunned, TokenCondition.Unconscious, TokenCondition['Exhaustion 1'], TokenCondition['Exhaustion 2'],
    TokenCondition['Exhaustion 3'], TokenCondition['Exhaustion 4'], TokenCondition['Exhaustion 5'], TokenCondition.Death]

export default TokenCondition
