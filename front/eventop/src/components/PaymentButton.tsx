import React, { useEffect } from "react";

interface PaymentButtonProps {
  preferenceId: string;
}

interface MercadoPagoWindow extends Window {
  MercadoPago: new (publicKey: string, options: { locale: string }) => {
    checkout: (options: {
      preference: { id: string };
      render: { container: string; label: string };
    }) => void;
  };
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ preferenceId }) => {
  useEffect(() => {
    const scriptId = "mercadoPagoScript";
    const initializeMercadoPago = () => {
      if ((window as unknown as MercadoPagoWindow).MercadoPago) {
        const mp = new (window as unknown as MercadoPagoWindow).MercadoPago(
          "APP_USR-55cf3037-c59b-4609-bd0c-2becbaf6c258",
          {
            locale: "es-AR",
          }
        );
        mp.checkout({
          preference: {
            id: preferenceId,
          },
          render: {
            container: ".cho-container",
            label: "Pagar",
          },
        });
      } else {
        console.error("MercadoPago SDK no está disponible.");
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://sdk.mercadopago.com/js/v2";
      script.async = true;
      document.body.appendChild(script);
      script.onload = initializeMercadoPago;
    } else {
      initializeMercadoPago();
    }
  }, [preferenceId]);

  return <div className="cho-container" />;
};

export default PaymentButton;
