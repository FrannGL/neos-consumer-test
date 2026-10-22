import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Autocomplete,
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  DownloadItem,
  DownloadsSection,
  FieldGroup,
  FileUpload,
  FormActions,
  Input,
  ItemCard,
  ItemsSection,
  ListCard,
  NotificationBar,
  Pagination,
  RadioGroup,
  RequiredField,
  Select,
  Tabs,
  Textarea,
  TicketCard,
  TicketList,
  TicketSkeleton,
  StructuredTicketCard,
  BasicEmployeeForm,
  ComplexEmployeeForm,
  EmployeeBasicInfo,
  WorkExperienceList,
  type Ticket,
} from "@neos/neos-ui";
import {
  CatalogCard,
  Footer,
  Header,
  Section,
  Sidebar,
} from "@neos/neos-ui/layout";
import "@neos/neos-ui/style.css";
import { BarChart3, CalendarDays, Check, Pencil, Plus, Search, Stethoscope, Trash2 } from "lucide-react";

const page = {
  padding: 32,
  background: "#f1f5f9",
  fontFamily: "system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const;

const wrap = {
  maxWidth: 980,
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: 28,
} as const;

const title = {
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.09em",
  color: "#64748b",
  fontWeight: 700,
  margin: 0,
} as const;

const card = {
  background: "#fff",
  border: "1px solid #e2e8f0",
  padding: 20,
  display: "flex",
  flexDirection: "column",
  gap: 16,
} as const;

const row = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  alignItems: "center",
} as const;

const col = {
  display: "flex",
  flexDirection: "column",
  gap: 14,
} as const;

const grid2 = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 16,
} as const;

const tickets: Ticket[] = [
  {
    id: 1042,
    title: "Fallo en el login con SSO",
    description:
      "El acceso con Azure AD falla para los usuarios del sector administrativo tras la rotacion de claves.",
    priority: "high",
    category: "bug",
    status: "open",
    createdAt: "2026-10-18",
    assignee: "Sistemas",
  },
  {
    id: 1039,
    title: "Solicitud de turno para dialysis",
    description:
      "El usuario solicita agregar un turno recurrente de dialysis para los proximos tres meses.",
    priority: "medium",
    category: "support",
    status: "in_progress",
    createdAt: "2026-10-15",
    assignee: "Coordinacion",
  },
  {
    id: 1031,
    title: "Nuevo campo en la ficha de paciente",
    description:
      "Agregar el campo de obra social al formulario de admision y al reporte mensual.",
    priority: "low",
    category: "feature",
    status: "closed",
    createdAt: "2026-10-02",
    assignee: "Producto",
  },
];

function Bloque({ id, titulo, children }: { id: string; titulo: string; children: React.ReactNode }) {
  return (
    <section id={id}>
      <h2 style={title}>{titulo}</h2>
      <div style={{ marginTop: 12 }}>{children}</div>
    </section>
  );
}

function Showcase() {
  const [nombre, setNombre] = useState("");
  const [sector, setSector] = useState("salud");
  const [permisos, setPermisos] = useState<string[]>(["lectura"]);
  const [autocomplete, setAutocomplete] = useState("");
  const [pagina, setPagina] = useState(1);
  const [experiencias, setExperiencias] = useState([
    {
      id: "1",
      position: "Senior Developer",
      company: "NeOS.NG",
      startDate: "2020-03",
      endDate: "Actualidad",
      description: "Platform y design system.",
    },
    {
      id: "2",
      position: "Frontend Developer",
      company: "CareFlow",
      startDate: "2017-06",
      endDate: "2020-02",
      description: "Aplicaciones de gestion.",
    },
  ]);

  return (
    <BrowserRouter>
      <Header />

      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <Sidebar />

        <main style={{ ...page, flex: 1, minWidth: 0 }}>
          <div style={wrap}>
            <header style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <h1 style={{ fontSize: 22, fontWeight: 700, color: "#0f172a", margin: 0 }}>
                Consumo de @neos/neos-ui
              </h1>
              <Badge label="0.1.6" variant="success" pulse />
            </header>

            {/* ---------- UI: basicos ---------- */}
            <Bloque id="s-basicos" titulo="Basicos — Input / Textarea / Select">
              <div style={card}>
                <div style={grid2}>
                  <Input
                    label="Nombre"
                    placeholder="Escribi tu nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    hint={`Caracteres: ${nombre.length}`}
                  />
                  <Input label="Con icono" icon={<Search size={16} />} placeholder="Buscar" />
                  <Input label="Con error" error="Este campo es obligatorio" defaultValue="xx" />
                  <Input label="Deshabilitado" disabled defaultValue="No editable" />
                  <Input label="Solo lectura" readOnly defaultValue="Solo lectura" />
                  <Input label="Requerido" required defaultValue="sin valor" />
                </div>
                <div style={grid2}>
                  <Textarea label="Notas" placeholder="Escribi notas aca" rows={3} />
                  <Textarea label="Con error" error="Maximo 200 caracteres" defaultValue="texto" />
                </div>
                <div style={grid2}>
                  <Select
                    label="Sector"
                    placeholder="Seleccionar"
                    options={[
                      { value: "salud", label: "Salud" },
                      { value: "tec", label: "Tecnologia" },
                      { value: "adm", label: "Administracion" },
                    ]}
                  />
                  <Select
                    label="Con error"
                    error="Selecciona una opcion"
                    options={[{ value: "a", label: "A" }]}
                  />
                </div>
              </div>
            </Bloque>

            {/* ---------- UI: seleccion ---------- */}
            <Bloque id="s-seleccion" titulo="Seleccion — Checkbox / CheckboxGroup / RadioGroup">
              <div style={card}>
                <div style={col}>
                  <Checkbox label="Recibir notificaciones" defaultChecked />
                  <Checkbox label="Terminos y condiciones" />
                  <Checkbox label="Opcion deshabilitada" disabled />
                </div>
                <CheckboxGroup
                  label="Permisos"
                  options={[
                    { value: "lectura", label: "Lectura" },
                    { value: "escritura", label: "Escritura" },
                    { value: "admin", label: "Administracion" },
                  ]}
                  values={permisos}
                  onChange={setPermisos}
                />
                <RadioGroup
                  label="Sector"
                  name="sector"
                  value={sector}
                  onChange={setSector}
                  options={[
                    { value: "salud", label: "Salud" },
                    { value: "tec", label: "Tecnologia" },
                    { value: "adm", label: "Administracion" },
                  ]}
                />
              </div>
            </Bloque>

            {/* ---------- UI: avanzados ---------- */}
            <Bloque id="s-avanzados" titulo="Avanzados — Autocomplete / FileUpload">
              <div style={card}>
                <Autocomplete
                  label="Paciente"
                  placeholder="Buscar paciente..."
                  options={[
                    { value: "1", label: "Ana Gomez" },
                    { value: "2", label: "Bruno Diaz" },
                    { value: "3", label: "Carla Ruiz" },
                  ]}
                  value={autocomplete}
                  onChange={setAutocomplete}
                />
                <FileUpload label="Documentacion" accept=".pdf,.png" multiple />
              </div>
            </Bloque>

            {/* ---------- UI: agrupacion ---------- */}
            <Bloque id="s-agrupacion" titulo="Agrupacion — FieldGroup / RequiredField / FormActions">
              <div style={card}>
                <FieldGroup title="Datos del turno" description="Informacion del turno solicitado">
                  <Input label="Fecha" type="date" />
                </FieldGroup>
                <FieldGroup
                  title="Seccion plegable"
                  badge={<Badge label="Nuevo" variant="info" />}
                  collapsible
                  defaultOpen
                >
                  <Input label="Observacion" />
                </FieldGroup>
                <RequiredField label="Motivo">
                  <Textarea rows={2} placeholder="Motivo del turno" />
                </RequiredField>
                <FormActions onCancel={() => {}} onSubmit={() => {}} />
              </div>
            </Bloque>

            {/* ---------- Feedback ---------- */}
            <Bloque id="s-feedback" titulo="Feedback — Badge / Button / NotificationBar">
              <div style={card}>
                <div style={row}>
                  <Badge label="Neutral" />
                  <Badge label="Success" variant="success" />
                  <Badge label="Warning" variant="warning" />
                  <Badge label="Error" variant="error" />
                  <Badge label="Info" variant="info" />
                  <Badge label="Con icono" variant="success" icon={<Check size={12} />} />
                </div>
                <div style={row}>
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="danger">Danger</Button>
                </div>
                <div style={row}>
                  <Button variant="primary" size="sm">sm</Button>
                  <Button variant="primary" size="md">md</Button>
                  <Button variant="primary" size="lg">lg</Button>
                </div>
                <div style={row}>
                  <Button variant="primary" icon={<Plus size={16} />}>Con icono</Button>
                  <Button variant="primary" loading>Loading</Button>
                  <Button variant="primary" status="success">Guardado</Button>
                  <Button variant="primary" status="error">Error</Button>
                  <Button variant="primary" disabled>Disabled</Button>
                </div>
                <NotificationBar type="success" title="Listo" message="El turno fue guardado." onClose={() => {}} />
                <NotificationBar type="info" title="Aviso" message="Hay 3 turnos pendientes de revision." />
                <NotificationBar type="warning" title="Atencion" message="El paciente no tiene obra social." />
                <NotificationBar type="error" title="Error" message="No se pudo guardar el turno." />
              </div>
            </Bloque>

            {/* ---------- Layout ---------- */}
            <Bloque id="s-layout" titulo="Layout — Section / CatalogCard">
              <div style={card}>
                <Section title="Seccion de ejemplo">
                  <p style={{ margin: 0 }}>Contenido de la seccion.</p>
                </Section>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <CatalogCard
                    title="Turnos"
                    description="Agenda y reprogramacion de turnos."
                    to="/turnos"
                  />
                  <CatalogCard
                    title="Reportes"
                    description="Indicadores de actividad."
                    to="/reportes"
                  />
                </div>
              </div>
            </Bloque>

            {/* ---------- Listas ---------- */}
            <Bloque id="s-listas" titulo="Listas — ListCard / ItemCard / DownloadsSection">
              <div style={card}>
                <ListCard>
                  <ListCard.Row>
                    <ListCard.Column span={5}>
                      <ListCard.Title id={1042}>Fallo en el login con SSO</ListCard.Title>
                      <ListCard.Description lines={2}>
                        Reportado por Sistemas. Rotacion de claves pendiente.
                      </ListCard.Description>
                    </ListCard.Column>
                    <ListCard.Column span={4}>
                      <ListCard.Tags>
                        <Badge label="Alta" variant="error" />
                        <Badge label="Bug" variant="info" />
                      </ListCard.Tags>
                    </ListCard.Column>
                    <ListCard.Column span={3}>
                      <ListCard.Actions>
                        <ListCard.Action icon={<Pencil size={16} />} title="Editar" />
                        <ListCard.Action icon={<Trash2 size={16} />} title="Borrar" variant="danger" />
                      </ListCard.Actions>
                    </ListCard.Column>
                  </ListCard.Row>
                </ListCard>
                <ItemsSection
                  items={[
                    {
                      id: "a",
                      title: "Gestion de turnos",
                      description: "Agenda, reprogramacion y cancelacion de turnos.",
                      IconComponent: CalendarDays,
                      href: "/turnos",
                    },
                    {
                      id: "b",
                      title: "Reportes",
                      description: "Indicadores de actividad y dialysis.",
                      IconComponent: BarChart3,
                      href: "/reportes",
                    },
                  ]}
                />
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <ItemCard
                    title="Turnos de dialysis"
                    description="Agenda diaria, reprogramacion y cancelacion."
                    IconComponent={Stethoscope}
                    href="/dialisis"
                  />
                  <DownloadItem
                    title="Manual de admision"
                    type="pdf"
                    url="#"
                    status="new"
                    size="2.1 MB"
                  />
                </div>
                <DownloadsSection
                  downloads={[
                    { title: "Manual de admision", type: "pdf", url: "#", status: "new", size: "2.1 MB" },
                    { title: "Planilla de turnos", type: "xls", url: "#", status: "updated", size: "840 KB" },
                    { title: "Formulario legacy", type: "doc", url: "#", status: "disabled", size: "120 KB" },
                  ]}
                />
              </div>
            </Bloque>

            {/* ---------- Patrones ---------- */}
            <Bloque id="s-patrones" titulo="Patrones — Tabs / TicketCard / Pagination">
              <div style={card}>
                <Tabs
                  tabs={[
                    { id: "t1", label: "Resumen", content: <p style={{ margin: 0 }}>Contenido del resumen.</p> },
                    { id: "t2", label: "Turnos", content: <p style={{ margin: 0 }}>Contenido de turnos.</p> },
                    {
                      id: "t3",
                      label: "Historial",
                      content: <p style={{ margin: 0 }}>Contenido del historial.</p>,
                      closable: true,
                    },
                  ]}
                />
                <TicketCard ticket={tickets[0]} />
                <StructuredTicketCard ticket={tickets[1]} />
                <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                  <TicketSkeleton />
                </ul>
                <Pagination
                  page={pagina}
                  totalPages={3}
                  onPrev={() => setPagina((p) => Math.max(1, p - 1))}
                  onNext={() => setPagina((p) => Math.min(3, p + 1))}
                />
              </div>
            </Bloque>

            {/* ---------- TicketList ---------- */}
            <Bloque id="s-ticketlist" titulo="TicketList — con filtros">
              <div style={card}>
                <TicketList data={tickets} title="Tickets" subtitle="Turnos y soporte" />
              </div>
            </Bloque>

            {/* ---------- Forms ---------- */}
            <Bloque id="s-forms" titulo="Forms — BasicEmployeeForm / EmployeeBasicInfo / WorkExperienceList">
              <div style={card}>
                <WorkExperienceList
                  experiences={experiencias}
                  onAdd={() =>
                    setExperiencias((e) => [
                      ...e,
                      {
                        id: String(e.length + 1),
                        position: "Nuevo puesto",
                        company: "Empresa",
                        startDate: "2026-01",
                        endDate: "Actualidad",
                        description: "Agregado desde el Showcase.",
                      },
                    ])
                  }
                  onEdit={() => {}}
                  onDelete={(id) => setExperiencias((e) => e.filter((x) => x.id !== id))}
                />
              </div>
            </Bloque>

            <Bloque id="s-employee" titulo="EmployeeBasicInfo">
              <div style={card}>
                <EmployeeBasicInfo />
              </div>
            </Bloque>

            <Bloque id="s-basic-form" titulo="BasicEmployeeForm">
              <div style={card}>
                <BasicEmployeeForm />
              </div>
            </Bloque>

            <Bloque id="s-complex-form" titulo="ComplexEmployeeForm">
              <div style={card}>
                <ComplexEmployeeForm />
              </div>
            </Bloque>
          </div>
        </main>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default function App() {
  return <Showcase />;
}
