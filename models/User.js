var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */

var User = new keystone.List('User', {
	track: true
});

User.add({
	name: {type: Types.Name, required: true, index: true},
	email: {type: Types.Email, initial: true, required: true, index: true},
	password: {type: Types.Password, initial: true, required: true}
}, 'Profile', {
	avatar: { type: Types.CloudinaryImage, autoCleanup : true},
	bio: {type: Types.Html, wysiwyg: true, height: 150},
	twitter: {type: String}
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
	isPublic: {type: Boolean, label: 'Show user on About page', index: true}
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

User.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

User.defaultColumns = 'name, email, isAdmin';
User.register();
