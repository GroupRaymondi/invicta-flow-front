import { useState, useEffect } from 'react';
import { UserFilters } from './UserFilters';
import { UsersTable } from './UsersTable';
import { UserDetailsDrawer } from './UserDetailsDrawer';
import { UserFormModal } from './UserFormModal';
import { EmptyState } from './EmptyState';
import { LoadingSkeleton } from './LoadingSkeleton';
import { mockUsers, type User } from '../../data/mockUsers';
import { mockRoles } from '../../data/mockRoles';

export const UsersTab = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);

    // UI States
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<User | null>(null);

    // Filters
    const [filters, setFilters] = useState({
        search: '',
        role: '',
        status: ''
    });

    useEffect(() => {
        // Simulate API load
        const timer = setTimeout(() => {
            setUsers(mockUsers);
            setFilteredUsers(mockUsers);
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleApplyFilters = () => {
        setIsLoading(true);
        setTimeout(() => {
            let result = [...users];

            if (filters.search) {
                const term = filters.search.toLowerCase();
                result = result.filter(u =>
                    u.nome.toLowerCase().includes(term) ||
                    u.email.toLowerCase().includes(term)
                );
            }
            if (filters.role) {
                result = result.filter(u => u.roleId === filters.role);
            }
            if (filters.status) {
                result = result.filter(u => u.status === filters.status);
            }

            setFilteredUsers(result);
            setIsLoading(false);
        }, 500);
    };

    const handleClearFilters = () => {
        setFilters({ search: '', role: '', status: '' });
        setFilteredUsers(users);
    };

    const handleSaveUser = (userData: Partial<User>) => {
        setIsLoading(true);
        setTimeout(() => {
            if (editingUser) {
                // Edit
                const updatedUsers = users.map(u =>
                    u.id === editingUser.id ? { ...u, ...userData } as User : u
                );
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers); // Re-apply filters ideally, but simple for now
            } else {
                // Create
                const newUser: User = {
                    id: `usr-${Date.now()}`,
                    criadoEm: new Date().toISOString(),
                    ...userData as any
                };
                const updatedUsers = [...users, newUser];
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
            }
            setIsModalOpen(false);
            setEditingUser(null);
            setIsLoading(false);
        }, 800);
    };

    const handleToggleStatus = (user: User) => {
        const newStatus = user.status === 'ativo' ? 'inativo' : 'ativo';
        const updatedUsers = users.map(u =>
            u.id === user.id ? { ...u, status: newStatus } : u
        );
        setUsers(updatedUsers as User[]);
        setFilteredUsers(updatedUsers as User[]);
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <UserFilters
                filters={filters}
                roles={mockRoles}
                setFilters={setFilters}
                onApply={handleApplyFilters}
                onClear={handleClearFilters}
                onNewUser={() => { setEditingUser(null); setIsModalOpen(true); }}
            />

            {isLoading ? (
                <LoadingSkeleton />
            ) : filteredUsers.length === 0 ? (
                <EmptyState
                    title="Nenhum usuário encontrado"
                    description="Tente ajustar os filtros ou crie um novo usuário."
                    actionLabel="Novo Usuário"
                    onAction={() => { setEditingUser(null); setIsModalOpen(true); }}
                />
            ) : (
                <UsersTable
                    users={filteredUsers}
                    roles={mockRoles}
                    onViewDetails={(u) => { setSelectedUser(u); setIsDrawerOpen(true); }}
                    onEdit={(u) => { setEditingUser(u); setIsModalOpen(true); }}
                    onToggleStatus={handleToggleStatus}
                />
            )}

            <UserDetailsDrawer
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                user={selectedUser}
                roles={mockRoles}
                onEdit={(u) => { setIsDrawerOpen(false); setEditingUser(u); setIsModalOpen(true); }}
            />

            <UserFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveUser}
                user={editingUser}
                roles={mockRoles}
            />
        </div>
    );
};
