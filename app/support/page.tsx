// import Footer from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';
import Link from 'next/link';

const legalLinks = [
  { title: "Shipping Policy", href: "/legal/shipping-policy" },
  { title: "Return Policy", href: "/legal/return-policy" },
  { title: "Warranty", href: "/legal/warranty" },
  { title: "Terms & Conditions", href: "/legal/terms-and-conditions" },
  { title: "Privacy Policy", href: "/legal/privacy-policy" },
]

export default function Page() {
  return (
    <div className="flex flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-12 md:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-foreground">
              Get in Touch
            </h1>
            <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
              We&apos;re here to help with any questions or issues you might have. Reach out to us through any of the channels below.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 lg:gap-12">
            {/* Left Column - Contact Info */}
            <Card className='border-none shadow-none'>
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Contact Information</CardTitle>
                <CardDescription>
                  For direct inquiries, feel free to contact us via phone or email.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-2">
                <div className='space-y-6 text-sm'>
                  <div className="flex items-start gap-4">
                    <Mail className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Email</h3>
                      <a href="mailto:mnoumankhalid03@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                        computerplussahiwal01@gmail.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Phone</h3>
                      <p className="text-muted-foreground">+92321-6901448 - whatsapp</p>
                      <p className="text-muted-foreground">+92320-7405669</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="h-6 w-6 text-primary mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Address</h3>
                      <p className="text-muted-foreground">Computer Plus, More Wala Chowk, Sahiwal</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-headline font-semibold mb-4 text-center md:text-left">Legal</h4>
                  <nav className="flex flex-col gap-2 text-sm text-center md:text-left">
                    {legalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="relative group text-muted-foreground transition-colors hover:text-primary"
                      >
                        <span className="relative z-10">{link.title}</span>
                        <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-primary transition-all"></span>
                      </Link>
                    ))}
                  </nav>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
}
