import {LookoutReport, LookoutRequest} from "@db/schemas";
import {api} from "@config/index";
import {crawlerRateLimitedQueue} from "@logic/crawler";
import * as sgMail from "@sendgrid/mail";
import {format} from "date-fns";

sgMail.setApiKey(api.SERVER__SENDGRID_API_KEY);

function _getReportUrl(hash) {
    return `${api.clientBaseUrl}/report/${hash}`;
}
async function sendEmail(lookout: LookoutRequest, report: LookoutReport, body: string) {
    const mailConfig = {
        to: lookout.email,
        from: api.SERVER__EMAIL_SENDER,
        subject: `New home offers highlights for you (${format(report.offersSince, "E (d.LL)")})`,
        text: "Please read full email for the info...",
        html: body
    }
    return sgMail.send(mailConfig);
}
function sendReportEmail(report: LookoutReport, lookout: LookoutRequest) {
    if (lookout.emailSubscriptionCanceled)
        return console.log("User has opted-out from email subscriptions");

    const requestUrl = _getReportUrl(report.hash);
    crawlerRateLimitedQueue({
        uri: requestUrl,
        callback: (error, response, done) => {
            const {body} = response;
            return sendEmail(lookout, report, body);
        }
    });
}


export {sendReportEmail};
