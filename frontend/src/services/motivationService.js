 export const motivationService = {
     getSentence
 }

 export function getSentence() {
     const num = getRandomInt(0, 15)
     return sentences[num]
 }

 function getRandomInt(min, max) {
     min = Math.ceil(min);
     max = Math.floor(max);
     return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
 }

 const sentences = [
     '"Strength doesn\'t come from what you can do. It comes from overcoming the things you once thought you couldn\'t." - Ashley Greene',
     '"Looking good is secondary. Having a healthy relationship with your body should your priority."',
     '"You may not be there yet. But you\'re closer than yesterday!"',
     '"It\'s not about being better than someone else... It\'s about being better than who you used to be."',
     '"Love yourself enough to live a healthy lifestyle." - Jules Robson',
     '"Always be yourself and have faith in yourself. Do not go out and look for a successful personality and try to duplicate it." - Bruce Lee',
     '"As soon as you trust yourself, you will know how to live." - Johann Wolfgang von Goethe',
     '"You cannot be lonely if you like the person you\'re alone with." - Wayne Dyer',
     '"If you hear a voice within you say \'you cannot paint,\' then by all means paint, and that voice will be silenced." - Vincent van Gogh',
     '"One important key to success is self-confidence. An important key to self-confidence is preparation." - Arthur Ashe',
     '"It is confidence in our bodies, minds, and spirits that allows us to keep looking for new adventures." - Oprah Winfrey',
     '"If we all did the things we are capable of doing, we would literally astound ourselves." - Thomas Alva Edison',
     '"Talk to yourself like you would to someone you love." - Brené Brown',
     '"Trust yourself. You know more than you think you do." - Dr. Benjamin Spock',
     '"Successful people have fear, successful people have doubts, and successful people have worries. They just don\'t let these feelings stop them." - T. Harv Eker'
 ]