import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Mongo } from 'meteor/mongo';

import './main.html';

const Contact = new Mongo.Collection('contacts');

Template.addContact.events({
	'click #saveContact': (event, template) => {
		event.preventDefault();

		let contact = $('form[name="formAddContact"]').serializeJSON();
		
		//console.log(contact);

		/*let contact = {
			name: template.find('input[name="name"]').value,
			lastname: template.find('input[name="lastname"]').value,
			telephone: template.find('input[name="telephone"]').value
		};*/

		Contact.insert(contact);
	}
});

Template.listContact.helpers({
	list: () => {
		var id = FlowRouter.getParam('id');
		return Contact.find({});
	}
});

Template.uniqueContact.helpers({
	unique: () => {
		var id = FlowRouter.getParam('id');
		return Contact.findOne({
			_id: id
		});
	}
});

Template.editContact.helpers({
	data: () => {
		var id = FlowRouter.getParam('id');
		return Contact.findOne({
			_id: id
		});
	}
});

Template.editContact.events({
	'click #editContact': () => {
		var id = FlowRouter.getParam('id');
		let contact = $('form[name="formEditContact"]').serializeJSON();
		event.preventDefault();
		Contact.update({
			_id: id
		}, contact);
	}
});


// ROTAS

FlowRouter.route('/home', {
	action: function() {
		BlazeLayout.render('mainLayout', {
			content: 'home'
		});
	}
});

FlowRouter.route('/hello', {
	action: function() {
		BlazeLayout.render('mainLayout', {
			content: 'hello'
		});
	}
});

FlowRouter.route('/hello/:name', {
	action: function(params, data) {
		//console.log(params.name);
		BlazeLayout.render('secondLayout', {
			content: 'hello'
		});
	}
});

FlowRouter.route('/contact/add', {
	action: () => {
		BlazeLayout.render('mainLayout', {
			content: 'addContact'
		});
	}
});

FlowRouter.route('/', {
	action: () => {
		BlazeLayout.render('mainLayout', {
			content: 'listContact'
		});
	}
});

FlowRouter.route('/:id', {
	action: () => {
		BlazeLayout.render('mainLayout', {
			content: 'uniqueContact'
		});
	}
});

FlowRouter.route('/edit/:id', {
	action: () => {
		BlazeLayout.render('mainLayout', {
			content: 'editContact'
		});
	}
});

FlowRouter.route('/remove/:id', {
	action: () => {
		var id = FlowRouter.getParam('id');
		Contact.remove(id);
		FlowRouter.go('/');
	}
});
