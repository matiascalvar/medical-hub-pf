import { Response, Request, Router } from "express";
const mercadopago = require("mercadopago");
const router = Router();

// Token creado desde las credenciales de Mercado Pago
// Debe ser movido luego a variables de entorno
mercadopago.configure({
  access_token:
    "TEST-3165795748532207-012420-5ce03fdac737c3769cd0c770d40a9972-131457142",
});

// Recibo el producto (title, unit price, quantity) y lo envio a MP
// Esto devuelve el preferenceID. Este se envia al front para generar el script de Mercado Pago
router.get("/", async (req: any, res: Response) => {
  let { appointmentId, unit_price, title } = req.query;
  unit_price = Number(unit_price);

  // console.log("QUERY: ", unit_price, quantity, title); // Test

  mercadopago.preferences
    .create({
      external_reference: appointmentId,
      back_urls: {
        success: "http://localhost:3000/home",
        failure: "http://localhost:3000/home",
        pending: "http://localhost:3000/home",
      },
      items: [
        {
          title,
          unit_price,
          quantity: 1,
          currency_id: "ARS",
        },
      ],
    })
    .then((preference: any) => {
      console.log(!"PREFERENCE: ", preference); // Test
      // return res.json({ preferenceId: preference.body.id });
      return res.json({ preferenceId: preference.response.sandbox_init_point });
    })
    .catch((e: Error) => console.log(e));
});

export default router;
