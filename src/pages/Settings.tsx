import { AppLayout } from '@/components/layout/AppLayout';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  User,
  Building,
  Bell,
  Shield,
  Palette,
  CreditCard,
  Mail,
  Globe,
} from 'lucide-react';

const settingsSections = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'organization', label: 'Organization', icon: Building },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'billing', label: 'Billing', icon: CreditCard },
];

export default function Settings() {
  return (
    <AppLayout>
      <Header title="Settings" subtitle="Manage your account and preferences" />

      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          {/* Profile Section */}
          <section className="glass rounded-xl p-6 mb-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Profile</h2>
                <p className="text-sm text-muted-foreground">Manage your personal information</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" defaultValue="John" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" defaultValue="Doe" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" defaultValue="+1 234 567 8900" className="bg-muted/50" />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button>Save Changes</Button>
            </div>
          </section>

          {/* Organization Section */}
          <section className="glass rounded-xl p-6 mb-6 animate-fade-in" style={{ animationDelay: '50ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Building className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Organization</h2>
                <p className="text-sm text-muted-foreground">Manage your organization settings</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orgName">Organization Name</Label>
                <Input id="orgName" defaultValue="EventFlow Inc." className="bg-muted/50" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" type="url" defaultValue="https://eventflow.app" className="bg-muted/50" />
              </div>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="glass rounded-xl p-6 mb-6 animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
                <p className="text-sm text-muted-foreground">Configure how you receive updates</p>
              </div>
            </div>

            <div className="space-y-4">
              <NotificationSetting
                icon={Mail}
                title="Email Notifications"
                description="Receive email updates for new registrations"
                defaultChecked={true}
              />
              <Separator />
              <NotificationSetting
                icon={Bell}
                title="Push Notifications"
                description="Get push notifications for check-ins"
                defaultChecked={true}
              />
              <Separator />
              <NotificationSetting
                icon={Globe}
                title="Marketing Emails"
                description="Receive tips and product updates"
                defaultChecked={false}
              />
            </div>
          </section>

          {/* Security Section */}
          <section className="glass rounded-xl p-6 animate-fade-in" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Security</h2>
                <p className="text-sm text-muted-foreground">Manage your security preferences</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                </div>
                <Button variant="outline">Enable</Button>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Change Password</p>
                  <p className="text-sm text-muted-foreground">Update your password regularly</p>
                </div>
                <Button variant="outline">Change</Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}

function NotificationSetting({
  icon: Icon,
  title,
  description,
  defaultChecked,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  defaultChecked: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-muted-foreground" />
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}
