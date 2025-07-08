import { useEffect, useState } from "react";
import axiosInstance from "../../../../lib/axiosInstanceWithToken";

function useInvoice(invoice_id) {
  const [invoiceData, setInvoiceData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!invoice_id) return;

    const fetchInvoice = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/invoices/${invoice_id}`);
        if (res.status === 200) {
          setInvoiceData(res.data.invoice);
        }
      } catch (error) {
        console.error("Error fetching invoice:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [invoice_id]);

  return { invoiceData, loading };
}

export default useInvoice;
