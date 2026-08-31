// import { MessageChatData } from "@/Types/Class/MessageChat"



// export function levelToXP(level: number): number {
//     return Math.floor(100 * Math.pow(level, 1.5))
// }

// export function xpToLevel(xp: number): number {

//     let level = 0

//     while (xp >= levelToXP(level + 1)) {
//         level++
//     }

//     return level
// }

// export function randomXP(min: number, max: number) {
//     return Math.floor(
//         Math.random() * (max - min + 1)
//     ) + min
// }

// export function calculateXP(message: MessageChatData): number {

//     // Ignore messages trop courts
//     if (message.text.trim().length < 3) {
//         return 0
//     }

//     let xp = 5

//     // Bonus subscriber
//     if (message.isSubscriber) {
//         xp += 2
//     }

//     // Bonus modo
//     if (message.isModerator) {
//         xp += 1
//     }

//     // Long message bonus
//     if (message.text.length > 50) {
//         xp += 2
//     }

//     return xp
// }