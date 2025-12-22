import Footer from '@/components/layout/footer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Page() {
  return (
    <div className="flex min-h-dvh flex-col bg-rose-50/20">
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
            <Card className="border-rose-100 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-headline">Contact Information</CardTitle>
                <CardDescription>
                  For direct inquiries, feel free to contact us via phone or email.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 text-sm">
                <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Email</h3>
                    <a href="mailto:mnoumankhalid03@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                      mnoumankhalid03@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Phone</h3>
                    <p className="text-muted-foreground">0321-6901448</p>
                    <p className="text-muted-foreground">0320-7405669</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground">Address</h3>
                    <p className="text-muted-foreground">Computer Plus, More Wala Chowk, Sahiwal</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
