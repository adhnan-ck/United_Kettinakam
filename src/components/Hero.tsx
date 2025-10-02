import { Link } from "react-router-dom";
import { Heart, Users, MapPin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
            <Heart className="w-4 h-4" fill="currentColor" />
            <span className="text-sm font-medium">Save Lives, Donate Blood</span>
          </div>
          
     <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
  Welcome to
  <span className="block mt-2 bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent">
    UNITED KETTINAKAM
  </span>
</h1>


          
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
           United Kettinakam's mission is simple: We save lives. We run rapid response blood donation drives to meet urgent hospital and community needs. Every donation makes an immediate, tangible difference. Give the gift of life today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-6 duration-700 delay-500">
            <Button asChild size="lg" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
              <Link to="/register">
                <Heart className="w-5 h-5 mr-2" fill="currentColor" />
                Become a Donor
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all">
              <Link to="/donors">
                <Users className="w-5 h-5 mr-2" />
                Find Donors
              </Link>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
          {[
            { icon: Users, title: "Active Community", desc: "" },
            { icon: MapPin, title: "Local Network", desc: "" },
            { icon: Heart, title: "Save Lives", desc: "" }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-card rounded-xl p-6 shadow-sm hover:shadow-md transition-all border border-border animate-in fade-in slide-in-from-bottom-8 duration-700"
              style={{ animationDelay: `${600 + idx * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>


     <div className="container mx-auto px-4 py-16 border-t border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-muted-foreground mb-8">
            Have questions or need urgent blood? Reach out to us and we'll respond as quickly as possible.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="font-semibold text-foreground mb-3">Call Us</span>
              <div className="space-y-2">
                <a href="tel:+918129686221" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Rashid E K : +91 8129686221
                </a>
                <a href="tel:+918296405806" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vasil T C : +91 8296405806
                </a>
                {/* <a href="tel:+919876543212" className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  +91 98765 43212
                </a> */}
              </div>
            </div>

            <a 
              href="https://www.instagram.com/united_kettinakam"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 bg-card rounded-xl border border-border hover:border-primary hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3 group-hover:bg-primary/20 transition-colors">
                <Instagram className="w-6 h-6 text-primary" />
              </div>
              <span className="font-semibold text-foreground mb-1">Follow Us</span>
              <span className="text-sm text-muted-foreground">@united_kettinakam</span>
            </a>
          </div>

          <div className="mt-12 text-center">
            <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-500 to-green-500 bg-clip-text text-transparent mb-2">
              #UNITED_BY_SOUL
            </p>
            <a href="https://adhnanashkar.netlify.app/">
            <p className="text-xs text-muted-foreground/60 animate-pulse flex items-center justify-center gap-1">
              Made by 
              <span className="font-bold text-foreground">
                Adhnan Ashkar
              </span>
            </p>
            </a>
            
          </div>


        </div>
      </div>

    </div>
    
  );
};

export default Hero;
