export default function Strings(){
    const AppStrings = {
	  "fr" : {
	      "lang" : "fr",
	      "day_short": "",
	      "hour_short": "",
	      "day": "",
	      "hour": "",
	      "error": {
		  "main": "Aïe, quelque chose est cassé…"
	      },
	      "components": {
		  "client_selector":{
		      "placeholder": ""
		  },
		  "project_selector":{
		      "placeholder": "Sélectionner un projet"
		  },
		  "task_selector":{
		      "select_task": "",
		      "new_task": "",
		      "add": ""
		  },
		  "add_project":{
		      "title": "",
		      "name_label": "",
		      "name_placeholder": "",
		      "desc_label": "",
		      "desc_placeholder": "",
		      "budget_label": "",
		      "budget_placeholder": "",
		      "create_project": "",
		      "cancel": ""
		  },
		  "add_client":{
		      "name_label": "",
		      "name_placeholder": "",
		      "create_client": "",
		      "cancel": ""
		  }
	      },
	      "login": {
		  "title": "",
		  "please_login": "",
		  "username": "",
		  "password": "",
		  "sign_in": "",
		  "remember_me": "",
		  "forgot_password": ""
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
			  "first_name": "",
			  "second_name": "",
			  "email": "",
			  "update": "",
			  "cancel": ""
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
		      "active_project": "Project actif",
		      "edit": "Modifier",
		      "delete": "Supprimer"		      
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
			  "caution_message": "Soyez prudent, car tout le temps enregistré sur ce projet sera effacé. Cette action ne peut pas être annulée."
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
		      "search": "",
		      "add_client": ""
		  },
		  "personal_manager": {
		      "time_enter": "",
		      "add_time": "",
		      "write_comment": "",
		      "submit": "",
		      "task": {
			  "edit": "",
			  "delete": ""
		      }
		  },
		  "project": {
		      "select_project": "",
		      "budget": "",
		      "edit": "",
		      "delete": ""
		  }
	      },
	      "synthesis": {
		  "search": ""
	      }
	  },
	  "en" : {
	      "lang" : "en",
	      "day_short": "",
	      "hour_short": "",
	      "day": "",
	      "hour": "",
	      "error": {
		  "main": "Something went wrong here…"
	      },
	      "components": {
		  "client_selector":{
		      "placeholder": ""
		  },
		  "project_selector":{
		      "placeholder": "Select a project"
		  },
		  "task_selector":{
		      "select_task": "",
		      "new_task": "",
		      "add": ""
		  },
		  "add_project":{
		      "title": "",
		      "name_label": "",
		      "name_placeholder": "",
		      "desc_label": "",
		      "desc_placeholder": "",
		      "budget_label": "",
		      "budget_placeholder": "",
		      "create_project": "",
		      "cancel": ""
		  },
		  "add_client":{
		      "name_label": "",
		      "name_placeholder": "",
		      "create_client": "",
		      "cancel": ""
		  }
	      },
	      "login": {
		  "title": "",
		  "please_login": "",
		  "username": "",
		  "password": "",
		  "sign_in": "",
		  "remember_me": "",
		  "forgot_password": ""
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
			  "first_name": "",
			  "second_name": "",
			  "email": "",
			  "update": "",
			  "cancel": ""
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
		      "delete": "Delete"		      
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
			  "caution_message": "Be careful, because all time tracked on this will be deleted. And this can't be undone."
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
			      "day": "Day",
			      "hour": "Hour"
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
		      "search": "",
		      "add_client": ""
		  },
		  "personal_manager": {
		      "time_enter": "",
		      "add_time": "",
		      "write_comment": "",
		      "submit": "",
		      "task": {
			  "edit": "",
			  "delete": ""
		      }
		  },
		  "project": {
		      "select_project": "",
		      "budget": "",
		      "edit": "",
		      "delete": ""
		  }
	      },
	      "synthesis": {
		  "search": ""
	      }
	  }
    }
    return AppStrings;
}
