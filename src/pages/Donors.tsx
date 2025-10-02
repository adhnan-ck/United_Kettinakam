import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Phone, MapPin, Droplet, Heart } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Donor {
  id: string;
  name: string;
  bloodGroup: string;
  gender: string;
  phone: string;
  place: string;
  createdAt: string;
}

const bloodGroups = ["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Donors = () => {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("All");

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    filterDonors();
  }, [searchTerm, selectedBloodGroup, donors]);

  const fetchDonors = async () => {
    try {
      const q = query(collection(db, "donors"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);
      const donorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Donor[];
      setDonors(donorsData);
      setFilteredDonors(donorsData);
    } catch (error) {
      console.error("Error fetching donors:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterDonors = () => {
    let filtered = donors;

    if (selectedBloodGroup !== "All") {
      filtered = filtered.filter((donor) => donor.bloodGroup === selectedBloodGroup);
    }

    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (donor) =>
          donor.name.toLowerCase().includes(lowerSearch) ||
          donor.place.toLowerCase().includes(lowerSearch) ||
          donor.phone.includes(searchTerm)
      );
    }

    setFilteredDonors(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-4">
              <Users className="w-4 h-4" />
              <span className="text-sm font-medium">Donor Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Find Blood Donors
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Search for blood donors by name, location, or blood group
            </p>
          </div>

          <Card className="mb-8 shadow-md border-border">
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    placeholder="Search by name, place, or phone..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedBloodGroup} onValueChange={setSelectedBloodGroup}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by blood group" />
                  </SelectTrigger>
                  <SelectContent>
                    {bloodGroups.map((group) => (
                      <SelectItem key={group} value={group}>
                        {group === "All" ? "All Blood Groups" : group}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Heart className="w-12 h-12 text-red-500 animate-pulse fill-current mb-4" />
              <p className="text-muted-foreground">Loading donors...</p>
            </div>
          ) : filteredDonors.length === 0 ? (
            <Card className="shadow-md border-border">
              <CardContent className="py-16 text-center">
                <Droplet className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No donors found</h3>
                <p className="text-muted-foreground">
                  {searchTerm || selectedBloodGroup !== "All"
                    ? "Try adjusting your search filters"
                    : "Be the first to register as a donor!"}
                </p>
              </CardContent>
            </Card>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredDonors.length} {filteredDonors.length === 1 ? "donor" : "donors"}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDonors.map((donor) => (
                  <Card
                    key={donor.id}
                    className="shadow-md hover:shadow-lg transition-all border-border group"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors uppercase">
                        {donor.name}
                        </CardTitle>

                        <Badge className="bg-primary text-primary-foreground shadow-sm">
                          {donor.bloodGroup}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>{donor.gender}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        <a
                          href={`tel:${donor.phone}`}
                          className="hover:text-primary transition-colors"
                        >
                          {donor.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground uppercase">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{donor.place}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Donors;
