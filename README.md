# tri-el-shaday
Papelaria completa com materiais escolares, itens de escritório e produtos criativos. Oferecemos qualidade, variedade e novidades que inspiram organização e criatividade. Um espaço acolhedor para estudar, trabalhar ou encontrar presentes únicos com estilo.


python3 -m http.server 8000 



# 🌐 Configuração DNS + GitHub Pages + Cloudflare

Este guia documenta a configuração do domínio:

**trielshadaypapelaria.com.br**

Integrado com:

* GitHub Pages
* Cloudflare DNS

---

## ✅ Status atual

✔ DNS configurado corretamente
✔ Proxy desativado (necessário para validação do GitHub)
✔ Registros A e CNAME corretos

---

## 📄 Configuração DNS (BIND)

```bash
$ORIGIN trielshadaypapelaria.com.br.
$TTL 300

; ==============================
; GITHUB PAGES
; ==============================

@   IN  A     185.199.108.153
@   IN  A     185.199.109.153
@   IN  A     185.199.110.153
@   IN  A     185.199.111.153

www IN  CNAME daniloichaves.github.io.

; ==============================
; API (BACKEND - AJUSTAR)
; ==============================

api IN  A     0.0.0.0

; ==============================
; TXT
; ==============================

@   IN  TXT   "v=spf1 -all"
_dmarc IN TXT "v=DMARC1; p=none;"
```

---

## ⚠️ Ajustes importantes

### 1. Proxy no Cloudflare

Deve estar:

* `DNS only (cinza)` para:

  * domínio raiz (@)
  * www

❌ NÃO usar proxy (nuvem laranja) antes da validação

---

### 2. GitHub Pages

No repositório:

**Settings → Pages**

Custom domain:

```
trielshadaypapelaria.com.br
```

---

### 3. Arquivo obrigatório no repositório

Criar arquivo:

```
CNAME
```

Conteúdo:

```
trielshadaypapelaria.com.br
```

---

## ⏱️ Tempo de propagação

* DNS: 5–15 minutos
* HTTPS: pode levar um pouco mais

---

## 🧪 Testes

Acesse:

* http://trielshadaypapelaria.com.br
* http://www.trielshadaypapelaria.com.br

---

## 🚨 Problemas comuns

### ❌ NotServedByPagesError

Causas:

* Proxy ativado no Cloudflare
* CNAME incorreto
* GitHub Pages não configurado

---

## 🔥 Pós-configuração (opcional)

Após tudo funcionando:

* Ativar proxy no Cloudflare
* SSL: `Full (strict)`
* Always HTTPS

---

## 🧠 Observações

* Registro `api` deve ser atualizado com IP real do backend
* MX removido (email não configurado)
* DMARC simplificado

---

## 🚀 Próximos passos

* Deploy automático via GitHub
* Configurar backend (Spring Boot)
* Melhorar performance com CDN

---
