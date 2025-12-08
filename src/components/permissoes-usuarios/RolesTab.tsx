import { useState, useEffect } from 'react';
import { RolesList } from './RolesList';
import { RolePermissionsMatrix } from './RolePermissionsMatrix';
import { RoleFormModal } from './RoleFormModal';
import { LoadingSkeleton } from './LoadingSkeleton';
import { mockRoles, type Role, type PermissionAction } from '../../data/mockRoles';

export const RolesTab = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);

    // UI States
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingRole, setEditingRole] = useState<Role | null>(null);

    useEffect(() => {
        // Simulate API load
        const timer = setTimeout(() => {
            setRoles(mockRoles);
            setSelectedRole(mockRoles[0]);
            setIsLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const handleSaveRole = (roleData: Partial<Role>) => {
        setIsLoading(true);
        setTimeout(() => {
            if (editingRole) {
                // Edit
                const updatedRoles = roles.map(r =>
                    r.id === editingRole.id ? { ...r, ...roleData } as Role : r
                );
                setRoles(updatedRoles);
                if (selectedRole?.id === editingRole.id) {
                    setSelectedRole({ ...selectedRole, ...roleData } as Role);
                }
            } else {
                // Create
                const newRole: Role = {
                    id: `role-${Date.now()}`,
                    userCount: 0,
                    permissoes: {}, // Default empty permissions
                    isSystem: false,
                    ...roleData as any
                };
                const updatedRoles = [...roles, newRole];
                setRoles(updatedRoles);
                setSelectedRole(newRole);
            }
            setIsModalOpen(false);
            setEditingRole(null);
            setIsLoading(false);
        }, 800);
    };

    const handleSavePermissions = (roleId: string, permissions: Record<string, PermissionAction[]>) => {
        // Optimistic update
        const updatedRoles = roles.map(r =>
            r.id === roleId ? { ...r, permissoes: permissions } : r
        );
        setRoles(updatedRoles);
        if (selectedRole?.id === roleId) {
            setSelectedRole({ ...selectedRole, permissoes: permissions } as Role);
        }
        // Here you would typically call an API
    };

    const handleDeleteRole = (roleId: string) => {
        if (confirm('Tem certeza que deseja excluir este papel?')) {
            const updatedRoles = roles.filter(r => r.id !== roleId);
            setRoles(updatedRoles);
            if (selectedRole?.id === roleId) {
                setSelectedRole(updatedRoles[0] || null);
            }
        }
    };

    if (isLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="h-[calc(100vh-240px)] flex gap-6 animate-in fade-in duration-500">
            <div className="w-1/3 h-full">
                <RolesList
                    roles={roles}
                    selectedRole={selectedRole}
                    onSelectRole={setSelectedRole}
                    onNewRole={() => { setEditingRole(null); setIsModalOpen(true); }}
                    onEditRole={(r) => { setEditingRole(r); setIsModalOpen(true); }}
                    onDeleteRole={handleDeleteRole}
                />
            </div>
            <div className="w-2/3 h-full">
                <RolePermissionsMatrix
                    role={selectedRole}
                    onSave={handleSavePermissions}
                />
            </div>

            <RoleFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveRole}
                role={editingRole}
            />
        </div>
    );
};
