export default function Strings(){
    const AppStrings = {
	  "fr" : {
	      "lang" : "fr",
	      "day_short": "j.",
	      "hour_short": "h.",
	      "day": "jour",
	      "hour": "heure",
	      "error": {
		  "main": "Aïe, quelque chose est cassé…"
	      },
	      "global": {
		  "cancel": "Annuler",
		  "loading_message": "Attendez…"		  
	      },
	      "components": {
		  "client_selector":{
		      "placeholder": "Sélectionner un client"
		  },
		  "project_selector":{
		      "placeholder": "Sélectionner un projet"
		  },
		  "task_selector":{
		      "select_task": "Sélectionner une tâche",
		      "new_task": "Nouvelle tâche",
		      "add": "Ajouter"
		  },
		  "add_project":{
		      "title": "Ajouter un project",
		      "name_label": "Nom",
		      "name_placeholder": "Un nom pour ce projet",
		      "error_name": "Entrez un nom de projet",
		      "desc_label": "Description",
		      "desc_placeholder": "Quelques mots pour décrire le projet",
		      "budget_label": "Budget",
		      "budget_placeholder": "Quel temps alloué ?",
		      "error_budget": "Entrez un budget",
		      "create_project": "Créer le projet",
		  },
		  "add_client":{
		      "name_label": "Nom",
		      "name_placeholder": "Un nom pour ce client",
		      "create_client": "Créer le client",
		      "error": "Veuillez choisir un nom"
		  }
	      },
	      "login": {
		  "title": "Temps calcul. Gérer le temps",
		  "please_login": "Veuillez vous connecter",
		  "username": "Nom d'utilisateur",
		  "username_placeholder": "Entrez votre nom d'utilisateur",
		  "password": "Mot de passe",
		  "password_placeholder": "Et votre mot de passe",
		  "sign_in": "Se connecter",
		  "remember_me": "Se souvenir de moi",
		  "forgot_password": "Mot de passe oublié",
		  "check_credentials": "Vérifier vos informations de connexion"
	      },
	      "lost_password": {
		  "check_email": "Regardez votre boîte mail",
		  "enter_email": "Entrez votre adresse mail",
		  "enter_email_placeholder": "Votre adresse mail",
		  "send_email": "Envoyer l'email"
	      },
	      "reset_password": {
		  "enter_password": "Entrez un mot de passe",
		  "message_success": "Ok. Votre nouveau mot de passe devrait être actif maintenant.",
		  
	      },
	      "navigation": {
		  "dashboard": "Vue d'ensemble",
		  "synthesis": "Synthèse",
		  "user": {
		      "connected_as": "Connecté sous ",
		      "admin": "Paramètres",
		      "logout": "Se déconnecter"
		  }
              },
	      "admin": {
		  "main": {
		      "edit_infos": "Modifier",
		      "sign_date": "Compte créé le ",
		      "edit": {
			  "first_name": "Prénom",
			  "second_name": "Nom",
			  "email": "Email",
			  "update": "Mettre à jour",
			  "cancel": "Annuler"
		      }
		  },
		  "clients": {
		      "name": "Clients",
		      "description": "Créer & gérer les clients",
		      "search": "Rechercher",
		      "filter": {
			  "name": "Filtrer",
			  "filter_name": "Nom",
			  "filter_date_added": "Date d'ajout",
			  "filter_role": "Role"
		      },
		      "add_client": "Ajouter un client",
		      "headers": {
			  "client": "Client"
		      },
		      "active_project": "project actif",
		      "edit": "Modifier",
		      "delete": "Supprimer",
		      "update": "Mettre à jour"
		  },
		  "projects": {
		      "name": "Projets",
		      "description": "Créer & modifier les projets",
		      "search": "Rechercher",
		      "filter": {
			  "name": "Filtrer",
			  "filter_name": "Nom",
			  "filter_date_added": "Date d'ajout",
			  "filter_role": "Role"
		      },
		      "add_project": "Ajouter un projet",
		      "headers": {
			  "client": "Client",
			  "project_desc": "Description du projet",
			  "budget": "Budget",
			  "tasks": "Tâches"
		      },
		      "edit": "Modifier",
		      "delete": "Supprimer",
		      "edition": {
			  "update": "Mettre à jour",
			  "cancel": "Annuler",
			  "delete_project": "Supprimer le projet",
			  "caution_message": "Soyez prudent, car tout le temps enregistré sur ce projet sera effacé. Cette action ne peut pas être annulée.",
			  "sure": "Sûr sûr ?"
		      }
		  },
		  "users": {
		      "name": "Utilisateurs",
		      "description": "Gérer vos utilisateurs",
		      "search": "Rechercher",
		      "filter": {
			  "name": "Filtrer",
			  "filter_name": "Nom",
			  "filter_date_added": "Date d'ajout",
			  "filter_role": "Rôle"
		      },
		      "headers": {
			  "user": "Utilisateur",
			  "role": "Rôle"
		      },
		      "select": {
			  "admin": "Administrateur",
			  "user": "utilisateur"
		      }
		  },
		  "params": {
		      "name": "Options",
		      "description": "Les réglages de l'application",
		      "unit": {
			  "name": "Unités de temps",
			  "description": "L'application indique par défaut les temps en heures. Vous pouvez modifier cette option et indiquer les temps en jours.",
			  "select": {
			      "day": "jour",
			      "hour": "heure"
			  }
		      },
		      "lang": {
			  "name": "Langue",
			  "description": "La langue utilisée dans l'application",
			  "select": {
			      "fr": "Français",
			      "en": "English"
			  }
		      }
		  }
	      },
	      "dashboard": {
		  "navigation": {
		      "search": "Rerchercher un projet",
		      "add_client": "Ajouter un client"
		  },
		  "personal_manager": {
		      "time_enter": "Ajouter du temps",
		      "add_time": "Ajouter du temps",
		      "add_time_placeholder": "Temps",
		      "comment_label": "Commentaire",
		      "write_comment": "Ajouter un commentaire à cette tâche",
		      "submit": "Ajouter",
		      "error":{
			  "start": "Vous devez entrer ",
			  "time_spent": "un temps passé, ",
			  "task": "une tâche, ",
			  "related_project": "un projet, ",
			  "end": "pour ajouter du temps"
		      },
		      "task": {
			  "edit": "Modifier",
			  "delete": "Supprimer",
			  "update": "Mettre à jour",
			  "time": "Temps",
			  "task": "Tâche",
			  "comment": "Commentaire"

		      }
		  },
		  "project": {
		      "select_project": "Sélectionner un projet",
		      "budget": "Budget",
		      "edit": "Modifier",
		      "delete": "Supprimer",
		      "update": "Mettre à jour"
		  }
	      },
	      "synthesis": {
		  "search": "Rechercher un projet",
		  "card": {
		      "on": "sur"
		  }
	      }
	  },
	  "en" : {
	      "lang" : "en",
	      "day_short": "d.",
	      "hour_short": "h.",
	      "day": "day",
	      "hour": "hour",
	      "error": {
		  "main": "Something went wrong here…"
	      },
	      "global": {
		  "cancel": "Cancel",
		  "loading_message": "Wait a minute…"
	      },
	      "components": {
		  "client_selector":{
		      "placeholder": "Select a client"
		  },
		  "project_selector":{
		      "placeholder": "Select a project"
		  },
		  "task_selector":{
		      "select_task": "Select a task",
		      "new_task": "Add a task",
		      "add": "Add"
		  },
		  "add_project":{
		      "title": "Add a project",
		      "name_label": "Name",
		      "name_placeholder": "A name for this project",
		      "error_name": "Please choose a name",
		      "desc_label": "Description",
		      "desc_placeholder": "Describe this project in a few words",
		      "budget_label": "Budget",
		      "budget_placeholder": "Time dedicated",
		      "error_budget": "Please add a budget",
		      "create_project": "Create project"
		  },
		  "add_client":{
		      "name_label": "Add a client",
		      "name_placeholder": "Name",
		      "create_client": "Create client",
		      "error_name": "Please choose a name"
		  }
	      },
	      "login": {
		  "title": "Time tracker. Manage time spent.",
		  "please_login": "Please login",
		  "username": "Username",
		  "username_placeholder": "Your username",
		  "password": "Password",
		  "password_placeholder": "And your password",
		  "sign_in": "Sign in",
		  "remember_me": "Remember me",
		  "forgot_password": "Forgot password",
		  "check_credentials": "Check your connection informations."
		  
	      },
	      "lost_password": {
		  "check_email": "Check your email",
		  "enter_email": "Enter email",
		  "enter_email_placeholder": "Your email",
		  "send_email": "Send email"
	      },
	      "navigation": {
		  "dashboard": "Dashboard",
		  "synthesis": "Synthesis",
		  "user": {
		      "connected_as": "Connected as",
		      "admin": "Settings",
		      "logout": "Logout"
		  }
              },
	      "admin": {
		  "main": {
		      "edit_infos": "Edit infos",
		      "sign_date": "Signed on",
		      "edit": {
			  "first_name": "First name",
			  "second_name": "Second name",
			  "email": "Email",
			  "update": "Update",
			  "cancel": "Cancel"
		      }
		  },
		  "clients": {
		      "name": "Clients",
		      "description": "Create & manage clients",
		      "search": "Search",
		      "filter": {
			  "name": "Filter",
			  "filter_name": "Name",
			  "filter_date_added": "Date added",
			  "filter_role": "Role"
		      },
		      "add_client": "Add a client",
		      "headers": {
			  "client": "Client"
		      },
		      "active_project": "active project",
		      "edit": "Edit",
		      "delete": "Delete",
		      "update": "Update"
		  },
		  "projects": {
		      "name": "Projects",
		      "description": "Create & manage projects",
		      "search": "Search",
		      "filter": {
			  "name": "Filter",
			  "filter_name": "Name",
			  "filter_date_added": "Date added",
			  "filter_role": "Role"
		      },
		      "add_project": "Add a project",
		      "headers": {
			  "client": "Client",
			  "project_desc": "Project & description",
			  "budget": "Budget",
			  "tasks": "Tasks"
		      },
		      "edit": "Edit",
		      "delete": "Delete",
		      "edition": {
			  "update": "Update",
			  "cancel": "Cancel",
			  "delete_project": "Delete project",
			  "caution_message": "Be careful, because all time tracked on this will be deleted. And this can't be undone.",
			  "sure": "Sure ?"
		      }
		  },
		  "users": {
		      "name": "Users",
		      "description": "Manage users",
		      "search": "Search",
		      "filter": {
			  "name": "Filter",
			  "filter_name": "Name",
			  "filter_date_added": "Date added",
			  "filter_role": "Role"
		      },
		      "headers": {
			  "user": "User",
			  "role": "Role"
		      },
		      "select": {
			  "admin": "Admin",
			  "user": "User"
		      }
		  },
		  "params": {
		      "name": "Settings",
		      "description": "Manage application settings",
		      "unit": {
			  "name": "Time unit",
			  "description": "Time is set in hour, by default. You can modify this, and see time entered on a day basis",
			  "select": {
			      "day": "day",
			      "hour": "hour"
			  }
		      },
		      "lang": {
			  "name": "Language",
			  "description": "The language used in this application",
			  "select": {
			      "fr": "Français",
			      "en": "English"
			  }
		      }
		  }
	      },
	      "dashboard": {
		  "navigation": {
		      "search": "Search project",
		      "add_client": "Add a client"
		  },
		  "personal_manager": {
		      "time_enter": "Enter time",
		      "add_time": "Enter time",
		      "add_time_placeholder": "Time",
		      "write_comment": "Write a comment",
		      "comment_label": "Comment",
		      "submit": "Submit time",
		      "error":{
			  "start": "You need ",
			  "time_spent": "a time spent, ",
			  "task": "a task, ",
			  "related_project": "a related project, ",
			  "end": " in order to enter time."
		      },
		      "task": {
			  "edit": "Edit",
			  "delete": "Delete",
			  "update": "Update",
			  "time": "Time",
			  "task": "Task",
			  "comment": "Comment"
		      }
		  },
		  "project": {
		      "select_project": "Select a project",
		      "budget": "Budget",
		      "edit": "Edit",
		      "delete": "Delete",
		      "update": "Update"
		  }
	      },
	      "synthesis": {
		  "search": "Search project",
		  "card": {
		      "on": "on"
		  }
	      }

	  }
    }
    return AppStrings;
}
