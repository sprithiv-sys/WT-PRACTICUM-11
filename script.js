/* ===== PRACTICUM 9: animations driven by user actions ===== */
    (function () {
      var toast = document.getElementById('toast');
      var toastTimer;

      window.showToast = function (message) {
        clearTimeout(toastTimer);
        toast.textContent = message;
        toast.classList.remove('hide');
        toast.classList.add('show');
        toastTimer = setTimeout(function () {
          toast.classList.remove('show');
          toast.classList.add('hide');
        }, 2800);
      };

      /* Trial button: idle -> loading -> done -> idle */
      var trialBtn = document.getElementById('trialBtn');
      var trialLabel = document.getElementById('trialLabel');
      trialBtn.addEventListener('click', function (event) {
        event.preventDefault();
        if (trialBtn.classList.contains('loading') || trialBtn.classList.contains('done')) return;
        trialBtn.classList.add('loading');
        trialLabel.textContent = 'Setting up workspace...';
        setTimeout(function () {
          trialBtn.classList.remove('loading');
          trialBtn.classList.add('done');
          trialLabel.textContent = 'Workspace ready \u2713';
          window.showToast('Your workspace is ready. Complete the form to continue.');
          document.getElementById('register').scrollIntoView({ behavior: 'smooth' });
          setTimeout(function () {
            trialBtn.classList.remove('done');
            trialLabel.textContent = 'Start 14-day free trial';
          }, 4000);
        }, 1500);
      });

      /* Step cards: open and close */
      document.querySelectorAll('.step').forEach(function (card) {
        card.addEventListener('click', function () { card.classList.toggle('open'); });
      });

      /* Release notes panel */
      var notesBtn = document.getElementById('notesBtn');
      var notesPanel = document.getElementById('notesPanel');
      notesBtn.addEventListener('click', function () {
        var isOpen = notesPanel.classList.toggle('open');
        notesBtn.textContent = isOpen ? 'Hide release notes' : 'Show release notes';
        notesBtn.setAttribute('aria-expanded', isOpen);
      });
    })();

/* ---- Next original inline script ---- */

/* ===== PRACTICUM 10: DOM manipulation ===== */
    (function () {
      var list = document.getElementById('pjList');
      var nameIn = document.getElementById('pjName');
      var ownerIn = document.getElementById('pjOwner');
      var msg = document.getElementById('pjMsg');
      var summary = document.getElementById('pjSummary');
      var empty = document.getElementById('pjEmpty');
      var clearBtn = document.getElementById('pjClear');
      var nextId = 1;

      function update() {
        var total = list.querySelectorAll('li').length;
        var active = list.querySelectorAll('.pill-on').length;
        summary.innerHTML = '<strong>' + total + '</strong> projects &middot; <strong>' + active + '</strong> active';
        empty.style.display = total ? 'none' : 'block';
        if (total) { clearBtn.removeAttribute('disabled'); } else { clearBtn.setAttribute('disabled', 'disabled'); }
      }

      function makeBtn(text, action, cls) {
        var b = document.createElement('button');
        b.className = 'sbtn ' + cls;
        b.textContent = text;
        b.setAttribute('data-action', action);
        return b;
      }

      function create(name, owner) {
        var li = document.createElement('li');
        li.className = 'pj-item';
        li.setAttribute('data-id', nextId++);

        var info = document.createElement('div');
        info.className = 'pj-info';
        var title = document.createElement('span');
        title.className = 'pj-title';
        title.textContent = name;
        var meta = document.createElement('p');
        meta.className = 'pj-meta';
        meta.textContent = 'Owner: ' + owner;
        info.appendChild(title);
        info.appendChild(meta);

        var actions = document.createElement('div');
        actions.className = 'pj-actions';
        var pill = document.createElement('span');
        pill.className = 'pill pill-on';
        pill.textContent = 'Active';
        actions.appendChild(pill);
        actions.appendChild(makeBtn('Pause', 'toggle', 'sbtn-light'));
        actions.appendChild(makeBtn('Edit', 'edit', 'sbtn-light'));
        actions.appendChild(makeBtn('Remove', 'remove', 'sbtn-danger'));

        li.appendChild(info);
        li.appendChild(actions);
        list.appendChild(li);
        update();
      }

      function say(text, type) {
        msg.textContent = text;
        msg.className = type;
        setTimeout(function () { msg.textContent = ''; msg.className = ''; }, 2500);
      }

      document.getElementById('pjAdd').addEventListener('click', function () {
        var name = nameIn.value.trim();
        var owner = ownerIn.value.trim();
        [nameIn, ownerIn].forEach(function (input) {
          input.setAttribute('aria-invalid', input.value.trim() ? 'false' : 'true');
        });
        if (!name || !owner) { say('Please enter both a project name and an owner.', 'error'); return; }
        create(name, owner);
        nameIn.value = '';
        ownerIn.value = '';
        nameIn.focus();
        say('Project "' + name + '" added.', 'ok');
      });

      ownerIn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') document.getElementById('pjAdd').click();
      });

      list.addEventListener('click', function (event) {
        var button = event.target.closest('button');
        if (!button) return;
        var li = button.closest('li');
        var action = button.getAttribute('data-action');

        if (action === 'remove') { li.remove(); update(); }

        if (action === 'toggle') {
          var pill = li.querySelector('.pill');
          var wasActive = pill.classList.contains('pill-on');
          pill.classList.toggle('pill-on', !wasActive);
          pill.classList.toggle('pill-paused', wasActive);
          pill.textContent = wasActive ? 'Paused' : 'Active';
          li.classList.toggle('paused', wasActive);
          button.textContent = wasActive ? 'Resume' : 'Pause';
          update();
        }

        if (action === 'edit') {
          var editing = li.querySelector('.pj-edit');
          if (!editing) {
            var title = li.querySelector('.pj-title');
            var input = document.createElement('input');
            input.setAttribute('type', 'text');
            input.setAttribute('maxlength', '40');
            input.setAttribute('aria-label', 'Edit project name');
            input.className = 'pj-edit';
            input.value = title.textContent;
            title.replaceWith(input);
            button.textContent = 'Save';
            input.focus();
          } else {
            var span = document.createElement('span');
            span.className = 'pj-title';
            span.textContent = editing.value.trim() || 'Untitled project';
            editing.replaceWith(span);
            button.textContent = 'Edit';
          }
        }
      });

      clearBtn.addEventListener('click', function () {
        list.querySelectorAll('li').forEach(function (li) { li.remove(); });
        update();
      });

      create('Website redesign', 'Anita Raman');
      create('Mobile app launch', 'Karthik S');
      create('Customer onboarding flow', 'Meera Nair');
    })();

/* ---- Next original inline script ---- */

/* ===== PRACTICUM 11: form validation ===== */
    (function () {
      var freeMail = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];

      // Date of birth: user must be at least 18 today
      var dob = document.getElementById('dob');
      if (dob) {
        var limit = new Date();
        limit.setFullYear(limit.getFullYear() - 18);
        dob.max = limit.toISOString().split('T')[0];
      }

      function errorBox(form, field) {
        var key = field.name || field.id;
        var box = form.querySelector('[data-error-for="' + key + '"]');
        if (!box) {
          box = document.createElement('span');
          box.className = 'error';
          box.setAttribute('data-error-for', key);
          (field.closest('.field') || field.parentNode).appendChild(box);
        }
        return box;
      }

      function validate(form, field) {
        field.setCustomValidity('');
        if (field.validity.patternMismatch && field.title) {
          field.setCustomValidity(field.title);
        }
        if (field.type === 'email' && form.hasAttribute('data-work-email') && field.value.indexOf('@') > -1) {
          var domain = field.value.split('@')[1].toLowerCase();
          if (freeMail.indexOf(domain) > -1) {
            field.setCustomValidity('Please use your work email, not a personal one.');
          }
        }
        if (field.id === 'confirm') {
          var pw = form.querySelector('#password');
          if (pw && field.value !== pw.value) field.setCustomValidity('Passwords do not match.');
        }
        if (field.classList.contains('touched')) {
          errorBox(form, field).textContent = field.checkValidity() ? '' : field.validationMessage;
        }
      }

      document.querySelectorAll('form[data-validate]').forEach(function (form) {
        var fields = form.querySelectorAll('input, select, textarea');
        var okBox = document.createElement('div');
        okBox.className = 'form-success';
        okBox.setAttribute('role', 'status');
        form.parentNode.insertBefore(okBox, form);
        var submitting = false;

        fields.forEach(function (field) {
          field.addEventListener('blur', function () {
            field.classList.add('touched');
            validate(form, field);
          });
          field.addEventListener('input', function () {
            validate(form, field);
            if (field.id === 'password') {
              var c = form.querySelector('#confirm');
              if (c && c.value) validate(form, c);
            }
          });
          field.addEventListener('change', function () {
            field.classList.add('touched');
            validate(form, field);
          });
        });

        form.addEventListener('submit', function (event) {
          event.preventDefault();
          okBox.classList.remove('show');
          fields.forEach(function (field) {
            field.classList.add('touched');
            validate(form, field);
          });
          if (!form.checkValidity()) {
            form.reportValidity();
            return;
          }
          okBox.textContent = form.getAttribute('data-success');
          okBox.classList.add('show');
          okBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
          document.dispatchEvent(new CustomEvent('tasklane:submitted', { detail: form.id }));
          submitting = true;
          form.reset();
          submitting = false;
        });

        form.addEventListener('reset', function () {
          fields.forEach(function (f) { f.classList.remove('touched'); f.setCustomValidity(''); });
          form.querySelectorAll('.error').forEach(function (e) { e.textContent = ''; });
          if (!submitting) okBox.classList.remove('show');
        });
      });
    })();
