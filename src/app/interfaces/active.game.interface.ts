import { Player } from './player.interface';
export interface ActiveGame{
    players: Array<Player>,
    season: number,
    gameid: string,
    potSize: number,
    bounties: number,
    buyIns: number,
    rebuys: number,
    firstWinnings: number,
    secondWinnings: number,
    thirdWinnings: number,
    fourthWinnings: number
}