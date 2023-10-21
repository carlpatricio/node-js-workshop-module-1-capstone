import sendGrind from '@sendgrid/mail';
import dotenv from 'dotenv';
import { SUBJECT } from './constants.js';

dotenv.config();
sendGrind.setApiKey(process.env.SEND_GRID_API_KEY)

export const sendEmail = async (emailPayload) => {
    try {
        const { to, html, text } = emailPayload;
        /**
         * form send grind payload
         */
        const msg = {
            to, // Change to your recipient
            from: process.env.SENDER_EMAIL, // Change to your verified sender
            subject: SUBJECT,
            text,
            html,
        }
        /**
         * send email
         */
        const res = await sendGrind.send(msg);

        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
