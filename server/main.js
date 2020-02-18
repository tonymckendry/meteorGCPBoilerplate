import '../imports/startup/server'

Meteor.startup(() => {
    // code to run on server at startup
    process.env.MAIL_URL =
        'smtp://SMTP_Injection:8a235d0ad4dbea9ca2d1f8fdb1045b687c6fe7f2@smtp.sparkpostmail.com:2525'
    Accounts.emailTemplates.from = 'admin@ausamtax.com'

    Migrations.migrateTo('latest')
})
