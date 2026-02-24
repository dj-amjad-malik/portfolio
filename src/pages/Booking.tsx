import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const eventTypes = [
  "Wedding / Sangeet",
  "Corporate Event",
  "Private Party",
  "Club Night",
  "Festival",
  "Other",
];

const paymentTerms = [
  "Booking confirmed only upon receipt of a 50% non-refundable advance.",
  "Remaining balance must be cleared before or on the event day, prior to performance.",
  "Overtime will be charged extra and payable immediately.",
  "Cancellations: advance is non-refundable; last-minute cancellations may attract full charges.",
  "Client is responsible for power supply, setup, and equipment safety.",
  "Any damage to DJ equipment will be charged to the client.",
  "DJ is not liable for delays or performance issues due to technical or power failures.",
  "All disputes are subject to Hyderabad jurisdiction only.",
];

const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "",
    eventType: "", eventDate: "", venue: "", message: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("http://localhost:4000/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        toast({ title: "Inquiry Sent!", description: "I'll get back to you within 24 hours." });
        setFormData({ name: "", email: "", phone: "", eventType: "", eventDate: "", venue: "", message: "" });
      } else {
        toast({ title: "Error", description: data.error || "Something went wrong.", variant: "destructive" });
      }
    } catch {
      toast({ title: "Error", description: "Could not reach server. Please try again.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <style>{`
        input[type="date"] {
          color-scheme: dark;
          position: relative;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          filter: brightness(0) invert(1);
          opacity: 0.6;
          cursor: pointer;
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          width: 16px;
          height: 16px;
        }
      `}</style>

      <main className="pt-20">
        {/* ── Simple page header ── */}
        <section className="py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-5 md:px-20 text-center">
            <span className="font-accent text-sm font-semibold uppercase tracking-widest text-primary mb-3 block">
              Let's Work Together
            </span>
            <h1 className="font-heading text-4xl md:text-5xl font-bold heading-gradient mb-3">
              Book Your Event
            </h1>
            <p className="text-muted-foreground mt-2">
              Fill out the form and I'll get back to you within 24 hours.
            </p>
          </div>
        </section>

        {/* ── Form + Terms ── */}
        <section className="pb-24">
          <div className="max-w-7xl mx-auto px-5 md:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

              {/* ── Inquiry Form ── */}
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                  Event Inquiry
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Name *
                      </label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="bg-background/50 border-secondary/30"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Phone *
                      </label>
                      <Input
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 98765 43210"
                        className="bg-background/50 border-secondary/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Email *
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                      className="bg-background/50 border-secondary/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Event Type *
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleChange}
                        required
                        className="w-full h-10 px-3 rounded-md text-sm bg-background/50 border border-secondary/30 text-foreground"
                      >
                        <option value="">Select type</option>
                        {eventTypes.map(t => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                        Event Date *
                      </label>
                      <Input
                        name="eventDate"
                        type="date"
                        value={formData.eventDate}
                        onChange={handleChange}
                        required
                        className="bg-background/50 border-secondary/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Venue / City
                    </label>
                    <Input
                      name="venue"
                      value={formData.venue}
                      onChange={handleChange}
                      placeholder="Hyderabad"
                      className="bg-background/50 border-secondary/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                      Message
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your event..."
                      rows={4}
                      className="bg-background/50 border-secondary/30 resize-none"
                    />
                  </div>

                  <Button type="submit" variant="cta" size="xl" className="w-full group" disabled={submitting}>
                    {submitting ? "Sending..." : "Send Inquiry"}
                    <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>

              {/* ── Payment Terms ── */}
              <div className="glass-card rounded-2xl p-8 md:p-10">
                <h2 className="font-heading text-xl font-bold text-foreground mb-6">
                  Payment Terms & Conditions
                </h2>

                <div className="space-y-0">
                  {paymentTerms.map((term, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-4 py-4 border-b border-border/50 last:border-0"
                    >
                      <span className="text-primary/40 font-heading font-bold text-lg leading-none mt-0.5 flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {term}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground/50 mt-6 pt-4 border-t border-border/30 leading-relaxed">
                  By submitting an inquiry you acknowledge and agree to the above terms.
                  Booking is only confirmed once advance payment is received.
                </p>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Booking;