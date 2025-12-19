import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function SignUp() {
    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row">
            <div className="hidden md:flex flex-1 bg-[#f8f7fa] items-center justify-center p-12">
                <img src="https://cdn.evbstatic.com/s3-build/perm_001/530d34/django/images/login/lateral-image-2.jpg" alt="Login visual" className="max-w-md w-full object-contain mix-blend-multiply" />
            </div>

            <div className="flex-1 flex flex-col p-8 md:p-24 justify-center max-w-2xl w-full mx-auto">
                <Link to="/" className="text-[#f05537] font-bold text-3xl mb-12 tracking-tight">nexus</Link>

                <h1 className="text-4xl font-extrabold text-[#1e0a3c] mb-8">Create an account</h1>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-[#1e0a3c] mb-2">Email address</label>
                        <Input className="h-12" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-[#1e0a3c] mb-2">First Name</label>
                            <Input className="h-12" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-[#1e0a3c] mb-2">Last Name</label>
                            <Input className="h-12" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#1e0a3c] mb-2">Password</label>
                        <Input className="h-12" type="password" />
                    </div>

                    <Button className="w-full h-12 bg-[#d1410c] hover:bg-[#d1410c]/90 font-bold text-lg">Sign Up</Button>

                    <div className="flex items-center gap-4 my-8">
                        <div className="h-px bg-border flex-1"></div>
                        <span className="text-sm text-muted-foreground uppercase">or</span>
                        <div className="h-px bg-border flex-1"></div>
                    </div>

                    <Button variant="outline" className="w-full h-12 border-black/80 text-[#1e0a3c] font-semibold">
                        Sign up with Google
                    </Button>

                    <div className="text-center mt-8">
                        <Link to="/signin" className="text-[#39364f] hover:text-[#d1410c] font-medium">Already have an account? Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
