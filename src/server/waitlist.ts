'use server'
import { getPayload } from 'payload'
import config from '@payload-config'

export const newWaitlistEntry = async (email: string) : Promise<string> => {
    const payload = await getPayload({ config })
    const emailExists = await payload.find({
        collection:"waitlist",
        where: {
            email: {
                equals:email
            }
        }
    })
    if (emailExists.docs.length === 1) {
        return "Email already exists";
    }
    const newEntry = await payload.create({
        collection:"waitlist",
        data: {
            email
        }
    })
    if (newEntry === null) {
        return "Error";
    }
    else {
        payload.sendEmail({
            to: email,
            subject: "Welcome to the Metaloss waitlist",
            text: "You have been added to the metaloss waitlist. We will notify you when the product is available.",
        })
    }
    return "Success";
}

export const getWaitlistCount = async () : Promise<number> => {
    const payload = await getPayload({ config })
    const count = await payload.db.count({
        collection:"waitlist",
    });
    return count.totalDocs;
}
