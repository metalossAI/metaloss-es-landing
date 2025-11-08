import { Endpoint, getPayload } from 'payload'
import config from '@payload-config'

export const contactFormEndpoint : Endpoint = {
	path: '/contact-form',
	method: 'post',
	handler: async (req) => {
		const payload = await getPayload({ config })
		if (!req.json) {
			return Response.json({ error: 'Invalid request' }, { status: 400 })
		}
		const data = await req.json() as any
		await payload.sendEmail({
			to: ['contact@metaloss.es'],
			subject: 'Formulario de contacto',
			html: `
				<div style="font-family: Arial, sans-serif; color: #222;">
					<table style="border-collapse: collapse; width: 100%; margin-bottom: 24px;">
					<thead>
						<tr>
						<th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left;">Nombre</th>
						<th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left;">Email</th>
						<th style="border: 1px solid #ddd; padding: 8px; background: #f5f5f5; text-align: left;">Mensaje</th>
						</tr>
					</thead>
					<tbody>
						<tr>
						<td style="border: 1px solid #ddd; padding: 8px;">${data.name}</td>
						<td style="border: 1px solid #ddd; padding: 8px;">${data.email}</td>
						<td style="border: 1px solid #ddd; padding: 8px;">${data.message}</td>
						</tr>
					</tbody>
					</table>
					<h2 style="margin-top: 0; color: #111;">Conversación</h2>
					<div style="background: #fafafa; border: 1px solid #eee; padding: 16px; border-radius: 6px; font-size: 15px;">
					${data.conversationHistory.map((line: string) => `<div style='margin-bottom: 6px;'>${line}</div>`).join('')}
					</div>
				</div>
				`
			})
		return Response.json({ success: true })
	}
}