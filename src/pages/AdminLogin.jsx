import React, { useState } from 'react';
    import { useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
    import { useToast } from '@/components/ui/use-toast';
    import { motion } from 'framer-motion';
    import { Shield } from 'lucide-react';

    const AdminLogin = () => {
      const [username, setUsername] = useState('');
      const [password, setPassword] = useState('');
      const [error, setError] = useState('');
      const navigate = useNavigate();
      const { toast } = useToast();

      const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (username === 'balen.matheus' && password === 'admmatheus') {
          localStorage.setItem('isAdminAuthenticated', 'true');
          toast({
            title: 'Login bem-sucedido!',
            description: 'Redirecionando para o painel...',
            variant: 'default',
          });
          navigate('/admin');
        } else {
          setError('Usuário ou senha inválidos.');
          toast({
            title: 'Erro de Login',
            description: 'Usuário ou senha inválidos.',
            variant: 'destructive',
          });
        }
      };

      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-secondary to-background p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Card className="w-full max-w-md shadow-2xl border-primary/30 bg-background/80 backdrop-blur-sm">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 text-primary">
                   <Shield size={48} />
                </div>
                <CardTitle className="text-3xl font-bold text-primary">Acesso Restrito</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Entre com suas credenciais de administrador.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-foreground">Usuário</Label>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="seu.usuario"
                      required
                      className="bg-input border-primary/40 focus:ring-primary text-foreground"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-foreground">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="********"
                      required
                      className="bg-input border-primary/40 focus:ring-primary text-foreground"
                    />
                  </div>
                  {error && <p className="text-sm text-destructive text-center">{error}</p>}
                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                    Entrar
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="text-center text-xs text-muted-foreground">
                <p>Apenas pessoal autorizado.</p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      );
    };

    export default AdminLogin;