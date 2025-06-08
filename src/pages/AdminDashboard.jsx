<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { supabase } from '../lib/supabaseClient';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Trash2, LogOut, Edit2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast";
import { SiWhatsapp } from 'react-icons/si';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('agendamentos')
          .select('*')
          .order('date', { ascending: true });

        if (error) throw error;

        setAppointments(data);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os agendamentos.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchAppointments();
  }, [toast]);

  const handleDeleteAppointment = async (id) => {
    try {
      const { error } = await supabase
        .from('agendamentos')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAppointments(appointments.filter(app => app.id !== id));

      toast({
        title: "Sucesso!",
        description: `Agendamento removido.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
      toast({
        title: "Erro",
        description: "Não foi possível remover o agendamento.",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData(appointments[index]);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingData({ ...editingData, [name]: value });
  };

  const saveEdit = async () => {
    try {
      const { error } = await supabase
        .from('agendamentos')
        .update(editingData)
        .eq('id', editingData.id);

      if (error) throw error;

      const updatedAppointments = appointments.map(app =>
        app.id === editingData.id ? editingData : app
      );

      setAppointments(updatedAppointments);
      setEditingIndex(null);

      toast({
        title: "Sucesso!",
        description: `Agendamento atualizado.`,
        variant: "default",
      });
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o agendamento.",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;
    const [year, month, day] = parts;
    return `${day}/${month}/${year}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado.",
      variant: "default",
    });
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p className="text-xl">Carregando agendamentos...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 min-h-screen bg-background text-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-primary">Painel de Agendamentos</h1>
        <div className="flex gap-2">
          <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            <Link to="/">Voltar ao Site</Link>
          </Button>
          <Button onClick={handleLogout} variant="destructive" className="hover:bg-destructive/80">
            <LogOut className="mr-2 h-4 w-4" /> Sair
          </Button>
        </div>
      </div>

      {appointments.length === 0 ? (
        <motion.div
          className="text-center py-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xl text-muted-foreground">Nenhum agendamento encontrado.</p>
        </motion.div>
      ) : (
        <motion.div
          className="overflow-x-auto bg-secondary p-4 md:p-6 rounded-lg shadow-xl border border-primary/20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Table>
            <TableHeader>
              <TableRow className="border-b-primary/30">
                <TableHead className="text-primary font-semibold">Cliente</TableHead>
                <TableHead className="text-primary font-semibold">Telefone</TableHead>
                <TableHead className="text-primary font-semibold">Serviços</TableHead>
                <TableHead className="text-primary font-semibold">Data</TableHead>
                <TableHead className="text-primary font-semibold">Hora</TableHead>
                <TableHead className="text-primary font-semibold">Valor</TableHead>
                <TableHead className="text-primary font-semibold text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((app, index) => (
                <TableRow key={index} className="border-b-primary/10 hover:bg-primary/5">
                  {editingIndex === index ? (
                    <>
                      <TableCell><input name="name" value={editingData.name} onChange={handleEditChange} /></TableCell>
                      <TableCell><input name="phone" value={editingData.phone} onChange={handleEditChange} /></TableCell>
                      <TableCell><input name="service" value={editingData.service} onChange={handleEditChange} /></TableCell>
                      <TableCell><input name="date" type="date" value={editingData.date} onChange={handleEditChange} /></TableCell>
                      <TableCell><input name="time" type="time" value={editingData.time} onChange={handleEditChange} /></TableCell>
                      <TableCell><input name="totalValue" type="number" value={editingData.totalValue} onChange={handleEditChange} /></TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" onClick={saveEdit}>Salvar</Button>
                        <Button variant="ghost" onClick={() => setEditingIndex(null)}>Cancelar</Button>
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{app.name}</TableCell>
                      <TableCell>{app.phone}</TableCell>
                      <TableCell>{Array.isArray(app.services) ? app.services.join(', ') : app.service || 'N/A'}</TableCell>
                      <TableCell>{formatDate(app.date)}</TableCell>
                      <TableCell>{app.time}</TableCell>
                      <TableCell>R$ {app.totalValue ? app.totalValue.toFixed(2).replace('.', ',') : '0,00'}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-green-600 hover:text-green-700"
                          onClick={() => {
                            const message = `Olá ${app.name}, só passando para lembrar do seu horário no dia ${formatDate(app.date)} às ${app.time}. O serviço agendado é: ${Array.isArray(app.services) ? app.services.join(', ') : app.service || 'N/A'}. Qualquer dúvida, estamos à disposição!`;
                            const phoneNumber = app.phone.replace(/\D/g, '');
                            const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
                            window.open(url, '_blank');
                          }}
                        >
                          <SiWhatsapp size={20} />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(index)}>
                          <Edit2 size={18} />
=======
import React, { useState, useEffect, useCallback } from 'react';
    import { Button } from '@/components/ui/button';
    import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
    import { Trash2, LogOut, MessageSquare } from 'lucide-react';
    import { motion } from 'framer-motion';
    import { Link, useNavigate } from 'react-router-dom';
    import { useToast } from "@/components/ui/use-toast";
    import {
      AlertDialog,
      AlertDialogAction,
      AlertDialogCancel,
      AlertDialogContent,
      AlertDialogDescription,
      AlertDialogFooter,
      AlertDialogHeader,
      AlertDialogTitle,
      AlertDialogTrigger,
    } from "@/components/ui/alert-dialog";
    import { supabase } from '@/lib/supabaseClient';

    const AdminDashboard = () => {
      const [appointments, setAppointments] = useState([]);
      const [isLoading, setIsLoading] = useState(true);
      const { toast } = useToast();
      const navigate = useNavigate();
      const barberShopWhatsappNumber = "554999617264"; 

      const fetchAppointments = useCallback(async () => {
        setIsLoading(true);
        try {
          const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .order('date', { ascending: true })
            .order('time', { ascending: true });

          if (error) {
            throw error;
          }
          setAppointments(data || []);
        } catch (error) {
          console.error("Erro ao buscar agendamentos:", error);
          toast({
            title: "Erro",
            description: "Não foi possível carregar os agendamentos.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      }, [toast]);

      useEffect(() => {
        fetchAppointments();

        const channel = supabase
          .channel('public:appointments')
          .on('postgres_changes', { event: '*', schema: 'public', table: 'appointments' }, (payload) => {
            console.log('Change received!', payload);
            fetchAppointments(); 
          })
          .subscribe();

        return () => {
          supabase.removeChannel(channel);
        };
      }, [fetchAppointments]);

      const handleDeleteAppointment = async (appointmentId, appointmentName) => {
        try {
          const { error } = await supabase
            .from('appointments')
            .delete()
            .eq('id', appointmentId);

          if (error) {
            throw error;
          }
          
          setAppointments(prevAppointments => prevAppointments.filter(app => app.id !== appointmentId));
          toast({
            title: "Sucesso!",
            description: `Agendamento de ${appointmentName} removido.`,
            variant: "default",
          });
        } catch (error) {
          console.error("Erro ao deletar agendamento:", error);
          toast({
            title: "Erro",
            description: "Não foi possível remover o agendamento.",
            variant: "destructive",
          });
        }
      };
      
      const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const parts = dateString.split('-');
        if (parts.length !== 3) return dateString; 
        const [year, month, day] = parts;
        return `${day}/${month}/${year}`;
      };

      const handleLogout = () => {
        localStorage.removeItem('isAdminAuthenticated');
        toast({
          title: "Logout realizado",
          description: "Você foi desconectado.",
          variant: "default",
        });
        navigate('/admin/login');
      };

      const handleWhatsAppConfirm = (appointment) => {
        const clientPhoneNumber = appointment.phone.replace(/\D/g, ''); 
        const message = encodeURIComponent(
          `Olá ${appointment.name}, seu agendamento na Barbearia Balen para ${Array.isArray(appointment.services) ? appointment.services.join(', ') : appointment.services} no dia ${formatDate(appointment.date)} às ${appointment.time} está confirmado! Valor total: R$ ${Number(appointment.total_value).toFixed(2).replace('.', ',')}. Aguardamos você!`
        );
        
        let whatsappUrl;
        if (clientPhoneNumber) {
           whatsappUrl = `https://wa.me/${clientPhoneNumber}?text=${message}`;
        } else {
           whatsappUrl = `https://wa.me/${barberShopWhatsappNumber}?text=Confirmar agendamento para ${appointment.name} em ${formatDate(appointment.date)} às ${appointment.time}. Serviços: ${Array.isArray(appointment.services) ? appointment.services.join(', ') : appointment.services}. Valor: R$ ${Number(appointment.total_value).toFixed(2).replace('.', ',')}. Cliente não forneceu número para contato direto.`;
        }
        window.open(whatsappUrl, '_blank');
      };


      if (isLoading) {
        return (
          <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
            <p className="text-xl">Carregando agendamentos...</p>
          </div>
        );
      }

      return (
        <motion.div 
          className="container mx-auto px-4 py-8 min-h-screen bg-background text-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl md:text-4xl font-bold text-primary">Painel de Agendamentos</h1>
            <div className="flex gap-2">
              <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <Link to="/">Voltar ao Site</Link>
              </Button>
              <Button onClick={handleLogout} variant="destructive" className="hover:bg-destructive/80">
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </Button>
            </div>
          </div>

          {appointments.length === 0 ? (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-xl text-muted-foreground">Nenhum agendamento encontrado.</p>
              <img   
                alt="Barbeiro olhando para agenda vazia" 
                className="mx-auto mt-8 w-64 h-64 opacity-50" src="https://images.unsplash.com/photo-1693755807658-17ce5331aacb" />
            </motion.div>
          ) : (
            <motion.div 
              className="overflow-x-auto bg-secondary p-4 md:p-6 rounded-lg shadow-xl border border-primary/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Table>
                <TableHeader>
                  <TableRow className="border-b-primary/30">
                    <TableHead className="text-primary font-semibold min-w-[150px]">Cliente</TableHead>
                    <TableHead className="text-primary font-semibold min-w-[120px]">Telefone</TableHead>
                    <TableHead className="text-primary font-semibold min-w-[180px]">Serviços</TableHead>
                    <TableHead className="text-primary font-semibold min-w-[100px]">Data</TableHead>
                    <TableHead className="text-primary font-semibold min-w-[80px]">Hora</TableHead>
                    <TableHead className="text-primary font-semibold min-w-[100px]">Valor Total</TableHead>
                    <TableHead className="text-right text-primary font-semibold min-w-[150px]">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {appointments.map((app) => (
                    <motion.tr 
                      key={app.id} 
                      className="border-b-primary/10 hover:bg-primary/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: appointments.indexOf(app) * 0.05 }}
                    >
                      <TableCell className="font-medium text-foreground py-3 md:py-4">{app.name}</TableCell>
                      <TableCell className="text-muted-foreground py-3 md:py-4">{app.phone}</TableCell>
                      <TableCell className="text-muted-foreground py-3 md:py-4">
                        {Array.isArray(app.services) ? app.services.join(', ') : app.services || 'N/A'}
                      </TableCell>
                      <TableCell className="text-muted-foreground py-3 md:py-4">{formatDate(app.date)}</TableCell>
                      <TableCell className="text-muted-foreground py-3 md:py-4">{app.time}</TableCell>
                      <TableCell className="text-muted-foreground py-3 md:py-4">R$ {app.total_value ? Number(app.total_value).toFixed(2).replace('.', ',') : '0,00'}</TableCell>
                      <TableCell className="text-right py-3 md:py-4 space-x-1">
                        <Button variant="ghost" size="icon" className="text-green-500 hover:text-green-500/80" onClick={() => handleWhatsAppConfirm(app)}>
                          <MessageSquare className="h-5 w-5" />
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
<<<<<<< HEAD
                              <Trash2 size={18} />
=======
                              <Trash2 className="h-5 w-5" />
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-secondary border-primary text-foreground">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-primary">Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
<<<<<<< HEAD
                                Tem certeza que deseja excluir este agendamento para {app.name}?
=======
                                Tem certeza que deseja excluir este agendamento para {app.name} em {formatDate(app.date)} às {app.time || 'N/A'}? Esta ação não pode ser desfeita.
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-primary text-primary hover:bg-primary/10">Cancelar</AlertDialogCancel>
<<<<<<< HEAD
                              <AlertDialogAction
                                onClick={() => handleDeleteAppointment(app.id)}
=======
                              <AlertDialogAction 
                                onClick={() => handleDeleteAppointment(app.id, app.name)}
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
<<<<<<< HEAD
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AdminDashboard;
=======
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </motion.div>
          )}
        </motion.div>
      );
    };

    export default AdminDashboard;
>>>>>>> 307d3833ef302c6b9711686b3eb921c13b7f12e4
