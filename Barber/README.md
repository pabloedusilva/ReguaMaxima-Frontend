# Régua Máxima - Dashboard Admin

Dashboard administrativo moderno e completo para gerenciamento da barbearia Régua Máxima.

## ✨ Características

### 🎨 Design System
- **Cores consistentes** com o site principal (Client)
- **Animações suaves** e transições modernas
- **Layout responsivo** para todos os dispositivos
- **Tema escuro** com tons dourados elegantes
- **Componentes reutilizáveis** e bem organizados

### 📊 Dashboard (Visão Geral)
- **Estatísticas em tempo real**: Total de barbeiros, clientes, agendamentos (mês/semana/dia)
- **Próximos agendamentos** com design idêntico ao Client
- **Cards interativos** com hover effects
- **Navegação intuitiva** com sidebar

### 📅 Área de Agendamentos
- **Listagem completa** com filtros avançados (status, data, busca)
- **Visualização detalhada** de cada agendamento
- **Cancelamento** com modal de confirmação
- **Interface organizada** com tabela responsiva

### ✂️ Área de Serviços
- **Modal fullscreen** para adicionar/editar
- **Galeria de 18+ imagens** pré-carregadas
- **Preview em tempo real**
- **Gestão completa** (criar, editar, excluir)

### 👥 Área de Profissionais
- **Upload de imagem** com preview
- **Cards visuais** com foto em destaque
- **Especialidades** configuráveis

### ⏰ Configuração de Horários
- **Gestão por dia da semana**
- **Horários flexíveis** (abertura, fechamento, pausas)
- **Toggle ativar/desativar** por dia

### ⚙️ Configurações da Barbearia
- **Perfil completo**: Logo, nome, Instagram, WhatsApp, descrição
- **Upload de imagens**
- **Modal fullscreen** para edição

## 🚀 Como Usar

### Login
- Acesse `/login`
- Digite qualquer telefone e senha (auto-redirect para demo)

### Navegação
- Use a **sidebar** ou **menu hamburguer** (mobile)
- Todas as seções estão acessíveis

## 🔌 Backend Integration (Preparado)

Todos os arquivos possuem comentários `// TODO: Backend Integration` indicando pontos de integração com API.

### Dados no localStorage (Temporário)
- `userBookings` - Agendamentos
- `barbershop_services` - Serviços
- `barbershop_professionals` - Profissionais
- `barbershop_hours` - Horários
- `barbershop_profile` - Configurações

## 🎨 Cores do Tema
```css
--gold: #c9953b
--bg: #0f0f10
--text: #f7f7f5
```

---

**Desenvolvido com React, TypeScript e Tailwind CSS**