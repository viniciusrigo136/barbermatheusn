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
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive/80">
                              <Trash2 size={18} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent className="bg-secondary border-primary text-foreground">
                            <AlertDialogHeader>
                              <AlertDialogTitle className="text-primary">Confirmar Exclusão</AlertDialogTitle>
                              <AlertDialogDescription className="text-muted-foreground">
                                Tem certeza que deseja excluir este agendamento para {app.name}?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel className="border-primary text-primary hover:bg-primary/10">Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeleteAppointment(app.id)}
                                className="bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
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
