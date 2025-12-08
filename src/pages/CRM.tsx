import { useState } from 'react';
import {
    DndContext,
    DragOverlay,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    type DragStartEvent,
    type DragOverEvent,
    type DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, MoreHorizontal, Calendar, DollarSign, User } from 'lucide-react';

type Id = string | number;

type Column = {
    id: Id;
    title: string;
};

type Task = {
    id: Id;
    columnId: Id;
    content: string;
    value?: string;
    client?: string;
    date?: string;
    priority?: 'low' | 'medium' | 'high';
};

const defaultCols: Column[] = [
    { id: 'leads', title: 'Leads Novos' },
    { id: 'in_progress', title: 'Em atendimento' },
    { id: 'proposal', title: 'Proposta Enviada' },
    { id: 'standby', title: 'Standby' },
    { id: 'sold', title: 'Vendido' },
    { id: 'not_interested', title: 'Não tem interesse' },
    { id: 'spam', title: 'Spam' },
];

const initialTasks: Task[] = [
    { id: '1', columnId: 'leads', content: 'Interesse em Visto EB-2', client: 'João Silva', value: 'U$ 15.000', date: 'Hoje', priority: 'high' },
    { id: '2', columnId: 'leads', content: 'Dúvida sobre Cidadania', client: 'Maria Oliveira', value: 'U$ 5.000', date: 'Ontem', priority: 'medium' },
    { id: '3', columnId: 'in_progress', content: 'Reunião de Alinhamento', client: 'Carlos Santos', value: 'U$ 12.000', date: '20 Nov', priority: 'high' },
    { id: '4', columnId: 'proposal', content: 'Proposta enviada - Visto O-1', client: 'Ana Costa', value: 'U$ 25.000', date: '18 Nov', priority: 'high' },
    { id: '5', columnId: 'sold', content: 'Contrato Assinado', client: 'Pedro Lima', value: 'U$ 18.000', date: '15 Nov', priority: 'medium' },
    { id: '6', columnId: 'standby', content: 'Aguardando documentos', client: 'Fernanda Souza', value: 'U$ 8.000', date: '10 Nov', priority: 'low' },
];

export const CRM = () => {
    const [columns] = useState<Column[]>(defaultCols);
    const [tasks, setTasks] = useState<Task[]>(initialTasks);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 3, // 3px movement required before drag starts
            },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === 'Column') {
            return;
        }

        if (event.active.data.current?.type === 'Task') {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveTask(null);

        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';

        if (!isActiveTask) return;

        // Dropping a Task over another Task
        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return arrayMove(tasks, activeIndex, overIndex);
            });
        }

        const isOverColumn = over.data.current?.type === 'Column';

        // Dropping a Task over a Column
        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                tasks[activeIndex].columnId = overId;
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveTask = active.data.current?.type === 'Task';
        const isOverTask = over.data.current?.type === 'Task';

        if (!isActiveTask) return;

        // Implements drag over logic for tasks
        if (isActiveTask && isOverTask) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                    tasks[activeIndex].columnId = tasks[overIndex].columnId;
                    return arrayMove(tasks, activeIndex, overIndex - 1);
                }

                return tasks;
            });
        }

        const isOverColumn = over.data.current?.type === 'Column';

        if (isActiveTask && isOverColumn) {
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                tasks[activeIndex].columnId = overId;
                return arrayMove(tasks, activeIndex, activeIndex);
            });
        }
    }

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col animate-in fade-in duration-500">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2">CRM</h1>
                    <p className="text-muted-foreground">Gerencie seus leads e oportunidades.</p>
                </div>
                <button className="bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2 shadow-lg shadow-primary/20">
                    <Plus size={20} />
                    Novo Lead
                </button>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="flex gap-4 overflow-x-auto pb-4 h-full items-start">
                    {columns.map((col) => (
                        <ColumnContainer key={col.id} column={col} tasks={tasks.filter((task) => task.columnId === col.id)} />
                    ))}
                </div>

                {typeof document !== 'undefined' && (
                    <DragOverlay>
                        {activeTask && (
                            <TaskCard task={activeTask} />
                        )}
                    </DragOverlay>
                )}
            </DndContext>
        </div>
    );
};

function ColumnContainer({ column, tasks }: { column: Column; tasks: Task[] }) {
    const { setNodeRef } = useSortable({
        id: column.id,
        data: {
            type: 'Column',
            column,
        },
    });

    const tasksIds = tasks.map((t) => t.id);

    return (
        <div
            ref={setNodeRef}
            className="bg-muted/30 w-[320px] min-w-[320px] h-full max-h-full rounded-xl flex flex-col border border-border/50"
        >
            <div className="p-4 font-bold text-foreground flex items-center justify-between border-b border-border/50 bg-muted/20 rounded-t-xl">
                <div className="flex items-center gap-2">
                    <span className="text-sm">{column.title}</span>
                    <span className="bg-background text-muted-foreground text-xs px-2 py-0.5 rounded-full border border-border">
                        {tasks.length}
                    </span>
                </div>
                <button className="text-muted-foreground hover:text-foreground">
                    <MoreHorizontal size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                <SortableContext items={tasksIds} strategy={verticalListSortingStrategy}>
                    {tasks.map((task) => (
                        <SortableTaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>
        </div>
    );
}

function SortableTaskCard({ task }: { task: Task }) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
        data: {
            type: 'Task',
            task,
        },
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="bg-card opacity-30 border-2 border-primary p-4 h-[150px] min-h-[150px] items-center flex text-left rounded-xl cursor-grab relative"
            />
        );
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
        >
            <TaskCard task={task} />
        </div>
    );
}

function TaskCard({ task }: { task: Task }) {
    return (
        <div className="bg-card p-4 rounded-xl border border-border hover:border-primary/50 hover:shadow-md transition-all cursor-grab group relative">
            <div className="flex justify-between items-start mb-3">
                <span className={`text-[10px] font-medium px-2 py-1 rounded border ${task.priority === 'high' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                    task.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                        'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    }`}>
                    {task.priority === 'high' ? 'Alta Prioridade' : task.priority === 'medium' ? 'Média Prioridade' : 'Baixa Prioridade'}
                </span>
                <button className="text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal size={16} />
                </button>
            </div>

            <h4 className="font-semibold text-foreground mb-1 text-sm line-clamp-2">{task.content}</h4>

            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                <User size={12} />
                <span>{task.client}</span>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-border/50 mt-3">
                <div className="flex items-center gap-1 text-xs font-medium text-green-500">
                    <DollarSign size={12} />
                    <span>{task.value}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                    <Calendar size={12} />
                    <span>{task.date}</span>
                </div>
            </div>
        </div>
    )
}
