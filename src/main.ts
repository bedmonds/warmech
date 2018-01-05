// Quick and Dirty Subscription-based bot to notify 
// Final Fantasy Randomizer community members whenever a race
// they might be interested in comes up on SpeedRunsLive.
import { WarMECH } from './warmech/warmech';

var auth = require('../auth.json');
let bot = new WarMECH();

bot.connect(auth.token);
